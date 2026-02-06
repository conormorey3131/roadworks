const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CARS_DIR = path.join(__dirname, '..', 'public', 'cars');
const SIZES = [
    { suffix: '-sm', width: 480 },
    { suffix: '-md', width: 800 },
    { suffix: '-lg', width: 1200 },
];
const QUALITY = 80;

async function getImageFolders() {
    const entries = fs.readdirSync(CARS_DIR, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
}

async function getImages(folder) {
    const folderPath = path.join(CARS_DIR, folder);
    const files = fs.readdirSync(folderPath);
    // Only get original images (not already processed ones with size suffixes)
    return files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        const name = path.basename(f, ext);
        const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        const isOriginal = !SIZES.some(s => name.endsWith(s.suffix));
        return isImage && isOriginal;
    });
}

async function processImage(folder, filename) {
    const folderPath = path.join(CARS_DIR, folder);
    const inputPath = path.join(folderPath, filename);
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);

    console.log(`  Processing: ${filename}`);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Skip if already WebP and has responsive versions
        const webpPath = path.join(folderPath, `${baseName}.webp`);
        const smPath = path.join(folderPath, `${baseName}-sm.webp`);

        if (ext.toLowerCase() === '.webp' && fs.existsSync(smPath)) {
            console.log(`    Skipping (already optimized)`);
            return;
        }

        // Create WebP version of original size (if source is JPG/PNG)
        if (ext.toLowerCase() !== '.webp') {
            await sharp(inputPath)
                .webp({ quality: QUALITY })
                .toFile(webpPath);
            console.log(`    Created: ${baseName}.webp`);
        }

        // Create responsive sizes
        for (const size of SIZES) {
            // Skip if image is smaller than target
            if (metadata.width && metadata.width <= size.width) {
                continue;
            }

            const outputName = `${baseName}${size.suffix}.webp`;
            const outputPath = path.join(folderPath, outputName);

            // Skip if already exists
            if (fs.existsSync(outputPath)) {
                continue;
            }

            await sharp(inputPath)
                .resize(size.width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: QUALITY })
                .toFile(outputPath);

            console.log(`    Created: ${outputName}`);
        }
    } catch (err) {
        console.error(`    Error processing ${filename}:`, err.message);
    }
}

async function main() {
    console.log('Image Optimization Script');
    console.log('=========================\n');

    const folders = await getImageFolders();
    console.log(`Found ${folders.length} car folders\n`);

    let totalProcessed = 0;

    for (const folder of folders) {
        console.log(`\nFolder: ${folder}`);
        console.log('-'.repeat(40));

        const images = await getImages(folder);
        console.log(`Found ${images.length} images to process`);

        for (const image of images) {
            await processImage(folder, image);
            totalProcessed++;
        }
    }

    console.log(`\n\nDone! Processed ${totalProcessed} images.`);
    console.log('\nNext steps:');
    console.log('1. Update HTML to use <picture> elements with WebP sources');
    console.log('2. Add srcset attributes for responsive loading');
    console.log('3. Use loading="lazy" for below-fold images');
}

main().catch(console.error);
