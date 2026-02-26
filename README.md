# Roadworks IRE - Static HTML Website

A production-ready, mobile-first static HTML website for Roadworks IRE built with vanilla JavaScript, Tailwind CSS (via CDN), and custom CSS. Features a dynamic theme system, smooth animations, and a 40-image gallery with lightbox.

## Features

- **Pure HTML/CSS/JS**: No build process required, works directly in browser
- **Dynamic Theme System**: Automatically uses featured car color (#B40F0E)
- **Mobile-First Design**: Fully responsive with mobile navigation
- **Image Gallery**: 40+ image gallery with lightbox functionality
- **Smooth Animations**: Fade-in effects, scroll animations, hover states
- **SEO Optimized**: Meta tags and semantic HTML
- **Performance Focused**: Lazy loading images, optimized assets

## Project Structure

```
roadworks/
├── index.html              # Home page
├── blog.html               # Blog index page
├── intro.html              # About page
├── featured-sheds.html     # Coming Soon page
├── sunroof.html            # Coming Soon page
├── projects.html           # Coming Soon page
├── events.html             # Coming Soon page
├── blog/
│   └── joshs-s15.html          # Josh's S15 article with 40-image gallery
├── css/
│   └── styles.css          # Custom styles and animations
├── js/
│   └── main.js             # JavaScript functionality
└── public/
    ├── brand/              # Logo and branding assets
    └── cars/               # Car images
        └── featured-build-01/  # 40 images for the feature

```

## Getting Started

### Local Development

1. Clone or download the repository
2. Open `index.html` in your web browser
3. No build process or server required!

For better development experience, you can use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

## Adding Content

### Adding the 40 Images

1. Place your images in `/public/cars/featured-build-01/`:
   - Name them: `01.jpg`, `02.jpg`, ... `40.jpg`
   - Supported formats: `.jpg`, `.png`, `.webp`
   - Recommended size: 1920x1080 or similar
   - Will be automatically lazy-loaded

2. Add a hero image:
   - Place at `/public/cars/featured-build-01/hero.jpg`
   - This is the main cover image

### Adding Your Logo

Place your logo files in `/public/brand/`:
- `logo.png` or `logo.svg` - Main logo
- `favicon.ico` - Browser favicon

### Customizing Theme Color

To change the theme color, edit `/js/main.js`:

```javascript
const featuredCar = {
    themeColor: '#B40F0E',  // Change this hex color
    secondaryColor: '#8B0000'
};
```

### Creating New Blog Posts

1. Copy `/blog/joshs-s15.html` as a template
2. Update the content, title, and meta tags
3. Add a link to the new post in `blog.html`
4. Update the homepage if it should be featured

## Customization

### Changing Fonts

Edit the Google Fonts link in each HTML file's `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update `/css/styles.css`:
```css
:root {
    --font-display: 'Your Display Font', sans-serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

### Modifying Colors

Edit `/css/styles.css` to change the color scheme:
```css
:root {
    --theme-color: 180, 15, 14;  /* RGB values */
    --theme-hex: #B40F0E;
    --theme-dark: #8B0000;
}
```

## Features Breakdown

### Mobile Navigation
- Hamburger menu on mobile devices
- Slide-in navigation drawer
- Touch-friendly interface

### Image Gallery
- Click any image to open in lightbox
- Keyboard navigation (arrows, ESC)
- Swipe gestures on mobile (via touch events)
- Shows image counter (1/40, 2/40, etc.)

### Animations
- Fade-in on scroll
- Hover effects on cards and buttons
- Page load animations
- Smooth transitions

### Theme System
- Automatically applies featured car color
- Updates buttons, links, and accents
- Maintains contrast for readability

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch
4. Site will be available at `https://username.github.io/repository-name/`

### Netlify

1. Drag and drop the folder to Netlify
2. Site deploys automatically

### Traditional Hosting

Simply upload all files to your web server via FTP/SFTP.

## Performance Tips

- Optimize images before uploading (use tools like TinyPNG)
- Consider using WebP format for better compression
- Enable GZIP compression on your server
- Use a CDN for better global performance

## Social Media

Current social link:
- Instagram: https://www.instagram.com/p/DNU4YN5tOaX/?img_index=3

To add more social links, edit the footer in each HTML file.

## License

All rights reserved - Roadworks IRE

## Support

For issues or questions, please contact Roadworks IRE through the social media channels listed on the website.