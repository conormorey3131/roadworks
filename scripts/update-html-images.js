const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const EAGER_COUNT = 6; // First N images load eagerly

// Blog post configurations
const posts = [
    {
        file: 'garrys-is200-ring-ready.html',
        folder: 'gearoids-is200',
        count: 34,
        carName: "Garry's IS200"
    },
    {
        file: 'andrews-sierra-sr20-bmw-box.html',
        folder: 'andrews-sierra',
        count: 27,
        carName: "Andrew's Sierra"
    },
    {
        file: 'jordons-hcr32-first-summer-shoot.html',
        folder: 'jordons-hcr32',
        count: 28,
        carName: "Jordon's HCR32"
    },
    {
        file: 'shanes-jzx81-long-time-in-the-making.html',
        folder: 'shanes-jzx81',
        count: 31,
        carName: "Shane's JZX81"
    },
    {
        file: 'featured-build-01.html',
        folder: 'featured-build-01',
        count: 40,
        carName: "Josh's S15"
    }
];

function generateGalleryItem(folder, num, carName, isEager) {
    const padded = String(num).padStart(2, '0');
    const loading = isEager ? 'eager' : 'lazy';
    const fetchPriority = isEager ? ' fetchpriority="high"' : '';
    const decoding = isEager ? 'sync' : 'async';

    return `                            <div class="gallery-item">
                                <img
                                    src="../public/cars/${folder}/${padded}.webp"
                                    srcset="../public/cars/${folder}/${padded}-sm.webp 480w,
                                            ../public/cars/${folder}/${padded}-md.webp 800w,
                                            ../public/cars/${folder}/${padded}-lg.webp 1200w,
                                            ../public/cars/${folder}/${padded}.webp 1600w"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    alt="${carName} - Image ${num}"
                                    loading="${loading}"
                                    decoding="${decoding}"${fetchPriority}>
                            </div>`;
}

function generateGalleryHTML(folder, count, carName) {
    const items = [];
    for (let i = 1; i <= count; i++) {
        items.push(generateGalleryItem(folder, i, carName, i <= EAGER_COUNT));
    }
    return items.join('\n');
}

function updatePostFile(post) {
    const filePath = path.join(BLOG_DIR, post.file);

    if (!fs.existsSync(filePath)) {
        console.log(`  Skipping ${post.file} - file not found`);
        return;
    }

    let html = fs.readFileSync(filePath, 'utf8');

    // Find the gallery section and replace image items
    const galleryStartRegex = /<div class="gallery-grid" id="gallery">/;
    const galleryEndRegex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/article>/;

    // Find gallery start
    const startMatch = html.match(galleryStartRegex);
    if (!startMatch) {
        console.log(`  Could not find gallery in ${post.file}`);
        return;
    }

    // Generate new gallery items
    const newGalleryItems = generateGalleryHTML(post.folder, post.count, post.carName);

    // Replace the gallery items using a more specific pattern
    const oldGalleryPattern = /(<div class="gallery-grid" id="gallery">)\s*(?:<!--[^>]*-->)?\s*((?:<div class="gallery-item">[\s\S]*?<\/div>\s*)+)/;

    html = html.replace(oldGalleryPattern, (match, galleryStart) => {
        return `${galleryStart}\n${newGalleryItems}\n                        `;
    });

    // Also update hero image to use WebP with srcset
    const heroImgRegex = new RegExp(
        `<img src="../public/cars/${post.folder}/01\\.(jpg|webp)"([^>]*)>`,
        'g'
    );

    html = html.replace(heroImgRegex, (match, ext, attrs) => {
        return `<img
                    src="../public/cars/${post.folder}/01.webp"
                    srcset="../public/cars/${post.folder}/01-md.webp 800w,
                            ../public/cars/${post.folder}/01-lg.webp 1200w,
                            ../public/cars/${post.folder}/01.webp 1600w"
                    sizes="100vw"
                    alt="${post.carName} - Hero shot"
                    class="w-full h-full object-cover"
                    decoding="sync"
                    fetchpriority="high"
                    loading="eager">`;
    });

    // Update preload links
    const preloadPattern = /<link rel="preload" as="image" href="\.\.\/public\/cars\/[^"]+\/(0[1-3])\.(jpg|webp)"[^>]*>/g;
    html = html.replace(preloadPattern, (match, num) => {
        return `<link rel="preload" as="image" href="../public/cars/${post.folder}/${num}.webp" fetchpriority="high">`;
    });

    fs.writeFileSync(filePath, html);
    console.log(`  Updated ${post.file}`);
}

function main() {
    console.log('Updating HTML files with optimized images...\n');

    for (const post of posts) {
        console.log(`Processing: ${post.file}`);
        updatePostFile(post);
    }

    console.log('\nDone!');
}

main();
