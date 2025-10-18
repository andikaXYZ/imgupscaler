# Image Upscaler & Converter

A web-based application for upscaling images with tracing and conversion features. Supports both single and bulk processing with export to JPEG, PNG, and EPS formats.

## Table of Contents
- [Features](#features)
- [Technology Comparison](#technology-comparison)
- [Quality & Use Cases](#quality--use-cases)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Technical Details](#technical-details)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

### 🖼️ Dual Mode Operation
- **Single Image Mode**: Upload and process one image at a time with live preview
- **Bulk Upload Mode**: Process multiple images simultaneously with batch download

### 📈 Image Upscaling
- **Scale Factor**: Enlarge images up to 8x from original size
- **Interpolation Methods**:
  - **Bilinear**: Fast processing, suitable for quick upscaling
  - **Bicubic**: Balanced quality and speed (recommended)
  - **Nearest Neighbor**: Best for pixel art and 8-bit graphics
- **Auto Sharpening**: Enhance image sharpness after upscaling

### 🎨 Image Tracing (Vectorization)
- Convert raster images to vector-like appearance
- **Threshold Control**: Adjust edge detection sensitivity
- **Color Reduction**: Choose from 2, 4, 8, or 16 colors
- Ideal for creating logos, icons, or simplified artwork

### 💾 Export Formats
- **PNG**: Lossless format with transparency support
- **JPEG**: Compressed format with adjustable quality (1-100%)
- **EPS**: Vector PostScript format for professional use

### 📦 Bulk Processing Features
- Multiple file upload (click or drag & drop)
- Individual image preview thumbnails
- Real-time status tracking (Pending/Processing/Done/Error)
- Progress bar with percentage indicator
- Remove individual images before processing
- Bulk download as ZIP archive
- Preserved original filenames with "_upscaled" suffix

## Technology Comparison

### This Application (Basic Interpolation)

| Aspect | Details |
|--------|---------|
| **Technology** | HTML5 Canvas API, Pure JavaScript |
| **Method** | Mathematical interpolation (Bilinear, Bicubic, Nearest) |
| **Processing** | Client-side, browser-based |
| **Requirements** | Any modern web browser, no special GPU |
| **AI/ML** | ❌ No AI enhancement |
| **Quality** | ⭐⭐ Basic upscaling |
| **Speed** | ⚡⚡⚡ Very fast |
| **Best for** | Quick resizing, web images, previews |

### AI-Powered Alternatives

| Aspect | Details |
|--------|---------|
| **Technology** | AI Models (Real-ESRGAN, etc.) + GPU acceleration |
| **Method** | Deep Learning Neural Networks |
| **Processing** | Desktop application, GPU-accelerated |
| **Requirements** | Vulkan-compatible GPU or powerful hardware |
| **AI/ML** | ✅ Trained on millions of images |
| **Quality** | ⭐⭐⭐⭐⭐ Professional AI enhancement |
| **Speed** | ⚡⚡ Moderate (depends on GPU) |
| **Best for** | Professional upscaling, print quality |

### Key Differences

**Mathematical Interpolation (This App):**
- Stretches existing pixels using algorithms
- Cannot add new details or information
- Results may appear blurry or pixelated
- Fast and lightweight
- No installation required

**AI Upscaling (Alternative Tools):**
- "Guesses" and generates new details using AI
- Can enhance textures and edges
- More natural-looking results
- Requires powerful hardware
- Desktop application installation needed

## Quality & Use Cases

### ✅ Best Use Cases for This Tool

**Perfect for:**
- Web graphics and social media images
- Quick previews and mockups
- Digital presentations
- Non-commercial projects
- Learning and experimentation
- Batch processing multiple images quickly
- Privacy-sensitive images (local processing)

**Recommended Settings:**
- Scale factor: 2-4x for best results
- Use Bicubic interpolation for photos
- Enable sharpening for clarity
- PNG format for lossless quality

### ⚠️ Limitations & Important Notes

**This tool uses mathematical interpolation, NOT AI:**
- Only stretches existing pixels mathematically
- Cannot generate new detail or information
- Results appear artificially enlarged at high scale factors
- May show blur, artifacts, or lack of sharpness
- Not suitable for professional printing or stock photography

**When to Use Professional Tools:**
- High-resolution print production
- Stock photography submissions
- Professional graphic design projects
- Medical or scientific imaging
- Restoration of important photographs

### 🎯 Quality Recommendations

**For Best Results:**
1. **Use Original High-Resolution Sources**
   - Start with highest quality available
   - Minimum 2-4MP for good results
   - Native resolution from camera/scanner

2. **Appropriate Enhancements**
   - Color correction and grading
   - Contrast and exposure adjustments
   - Moderate sharpening only
   - Lens correction

3. **Avoid Over-Processing**
   - Don't upscale more than 4x
   - Don't apply heavy artificial sharpening
   - Don't use as substitute for high-res originals
   - Don't expect AI-level quality

## Installation

### Quick Start (No Installation Required)

1. **Download the files** to your local machine:
   ```
   upscale/
   ├── index.html
   ├── script.js
   ├── style.css
   └── README.md
   ```

2. **Open `index.html`** in any modern web browser

3. **Start uploading and processing images!**

### Using with XAMPP or Local Server

1. Copy the `upscale` folder to your web server directory:
   - XAMPP: `htdocs/upscale/`
   - WAMP: `www/upscale/`
   - MAMP: `htdocs/upscale/`

2. Access via browser:
   ```
   http://localhost/upscale/
   ```

### Dependencies

**External Libraries (Loaded via CDN):**
- JSZip 3.10.1 - For ZIP file creation in bulk mode

**No Installation Needed:**
- All processing happens in the browser
- No server-side code required
- No build process or compilation

## Usage Guide

### Single Image Mode

#### Step 1: Upload Image
1. Click the upload area or drag & drop an image
2. Supported formats: JPEG, PNG, GIF, WebP
3. Image preview appears on the left

#### Step 2: Configure Upscale Settings
1. **Scale Factor**: Drag slider (1x - 8x)
2. **Interpolation Method**:
   - Bilinear: Fast, good for photos
   - Bicubic: Best quality (default)
   - Nearest: Pixel art and retro graphics
3. **Sharpening**: Check to enhance edges

#### Step 3: Tracing (Optional)
1. Check "Enable Image Tracing" for vectorization
2. **Threshold**: Adjust edge detection (0-255)
3. **Color Count**: Select color palette size
   - 2 colors: Black & white
   - 4-16 colors: Limited palette effect

#### Step 4: Select Export Format
1. Click desired format button (PNG/JPEG/EPS)
2. **JPEG**: Adjust quality slider (1-100%)
3. **EPS**: Vector format for professional use

#### Step 5: Process & Download
1. Click **"Process Image"**
2. Wait for processing to complete
3. Review result on the right
4. Click **"Download Result"**

#### Step 6: Reset (Optional)
- Click **"Reset"** to start over with a new image

### Bulk Upload Mode

#### Step 1: Switch to Bulk Mode
- Click **"Bulk Upload"** button at the top

#### Step 2: Upload Multiple Images
- **Method 1**: Click upload area and select multiple files (Ctrl/Cmd + Click)
- **Method 2**: Drag & drop multiple images at once
- All images display as thumbnail grid

#### Step 3: Review Uploaded Images
- Each thumbnail shows:
  - Image preview
  - Filename
  - Dimensions (width × height)
  - Status badge (Pending)
- **Remove images**: Hover and click the **×** button

#### Step 4: Configure Settings
- Adjust scale factor, interpolation, tracing, and format
- **Same settings apply to all images**

#### Step 5: Process All Images
1. Click **"Process All Images"**
2. Watch the progress bar and status updates
3. Status changes: 🟡 Pending → 🔵 Processing → 🟢 Done
4. Errors (if any) show as: 🔴 Error

#### Step 6: Download ZIP Archive
1. Click **"Download All (ZIP)"**
2. Wait for ZIP creation
3. ZIP file downloads automatically
4. Extract to view all processed images

#### Step 7: Clear All (Optional)
- Click **"Clear All"** to remove all images and reset

### Tips for Best Results

#### For Photographs
- Scale factor: 2-4x (higher may look artificial)
- Interpolation: Bicubic
- Sharpening: Enabled
- Format: PNG (quality) or JPEG 85-95% (smaller files)

#### For Logos/Icons
- Scale factor: 2-3x
- Interpolation: Bicubic
- Tracing: Enabled with 2-4 colors
- Format: EPS for professional vector editing

#### For Pixel Art
- Scale factor: 2x, 4x, or 8x (integer multiples)
- Interpolation: Nearest Neighbor
- Sharpening: Disabled
- Format: PNG

#### For Print/Professional Use
- Scale factor: Maximum needed resolution
- Interpolation: Bicubic
- Sharpening: Enabled
- Tracing: Optional for vector style
- Format: EPS for professional printing

**Note:** For true professional quality, consider AI-based upscaling tools.

## Technical Details

### Architecture

**Frontend-Only Application:**
- No backend server required
- All processing in browser using Canvas API
- Client-side JavaScript (Vanilla JS, no frameworks)
- Responsive CSS3 design

### Image Processing Pipeline

1. **Image Loading**: FileReader API to load image data
2. **Upscaling**: Canvas scaling with configured interpolation
3. **Sharpening**: Convolution kernel (3×3 matrix)
4. **Tracing**: Posterization and color quantization
5. **Export**: Canvas to Blob conversion or EPS generation

### Interpolation Algorithms

**Bilinear:**
- 2×2 pixel neighborhood
- Fast computation
- Smoother than nearest neighbor
- May introduce slight blur

**Bicubic:**
- 4×4 pixel neighborhood
- Higher quality results
- Better edge preservation
- Slightly slower than bilinear

**Nearest Neighbor:**
- No interpolation (1×1)
- Preserves hard edges
- Perfect for pixel art
- Creates blocky appearance in photos

### Sharpening Algorithm

**Unsharp Mask Kernel:**
```
[  0, -1,  0 ]
[ -1,  5, -1 ]
[  0, -1,  0 ]
```
- Enhances edges and details
- Applied after upscaling
- Optional for user control

### EPS Generation

**Format:** PostScript Level 3 (EPS 3.0)
- Contains raster image data
- Hex-encoded RGB values
- BoundingBox for dimensions
- Compatible with professional vector editing software

**Structure:**
```postscript
%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 [width] [height]
[Image data in hexadecimal]
%%EOF
```

### Bulk Processing

**Async Processing:**
- Sequential processing with UI updates
- 50ms delay between images for responsiveness
- Non-blocking operations
- Progress tracking and status updates

**ZIP Creation:**
- JSZip library for archive creation
- Folder structure: `upscaled_images/`
- Filename preservation with suffix
- Format-specific extensions

### File Size Limits

**Recommended:**
- Single image: < 10MB for optimal performance
- Bulk mode: < 5MB per image
- Total bulk: < 100MB for best experience

**Maximum:**
- Limited by browser memory
- Modern browsers: 100-500MB
- Processing time increases with size

### Performance Benchmarks

**Single Image (2000×1500, 2x upscale):**
- Bilinear: ~100-200ms
- Bicubic: ~150-300ms
- Nearest: ~50-100ms
- Sharpening: +50-150ms

**Bulk Processing (10 images):**
- Average: 2-5 seconds total
- Depends on size and settings

## Browser Support

### Fully Supported ✅

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Excellent performance |
| Edge | 90+ | Excellent performance |
| Firefox | 88+ | Excellent performance |
| Safari | 14+ | Good performance |
| Opera | 76+ | Excellent performance |

### Required Features

- HTML5 Canvas API
- FileReader API
- Blob API
- ES6 JavaScript (Promises, Arrow functions)
- CSS Grid and Flexbox

### Mobile Support

**Tested:**
- iOS Safari 14+
- Chrome Android 90+
- Firefox Android 88+

**Limitations:**
- Slower processing on mobile devices
- Memory constraints may limit image size
- Bulk mode may be slow with many images

## Troubleshooting

### Issue: Upscaled image looks blurry

**Solution:**
- Enable sharpening option
- Try Bicubic interpolation instead of Bilinear
- Use smaller scale factor (2-3x instead of 6-8x)
- Remember: Mathematical upscaling cannot add true detail

### Issue: Tracing doesn't show visible effect

**Solution:**
- Increase or decrease threshold value
- Use fewer colors (2-4 instead of 8-16)
- Ensure "Enable Image Tracing" is checked
- Try on images with clear shapes/edges

### Issue: Download button doesn't work

**Solution:**
- Check browser popup blocker
- Ensure browser allows downloads
- Try different browser
- Check browser console for errors

### Issue: Bulk ZIP download fails

**Solution:**
- Check internet connection (JSZip loads from CDN)
- Reduce number of images
- Ensure all images processed successfully
- Check browser console for errors
- Refresh page and try again

### Issue: Image too large, browser freezes

**Solution:**
- Use smaller source images (< 5MB)
- Reduce scale factor
- Close other browser tabs
- Try a different browser with more memory
- Process fewer images at once in bulk mode

### Issue: EPS file won't open in vector editor

**Solution:**
- EPS contains raster data, not true vectors
- Use "Place" or "Import" instead of "Open"
- Try opening in other compatible software
- For true vectors, use dedicated tracing software

### Issue: Colors look different after processing

**Solution:**
- Browser color management may vary
- Ensure source image is RGB (not CMYK)
- JPEG quality setting affects colors
- Try PNG for lossless color preservation

### Issue: Bulk processing stops midway

**Solution:**
- Check for corrupted images in upload
- Reduce number of images
- Ensure sufficient browser memory
- Check console for specific errors
- Remove problematic images and reprocess

## Project Structure

```
upscale/
│
├── index.html          # Main HTML structure
│   ├── Mode selector (Single/Bulk)
│   ├── Upload areas
│   ├── Preview canvases
│   ├── Control panels
│   └── Progress indicators
│
├── script.js           # Application logic
│   ├── Event handlers
│   ├── Image processing functions
│   ├── Upscaling algorithms
│   ├── Bulk processing logic
│   ├── ZIP creation
│   └── Download handlers
│
├── style.css           # Styling and layout
│   ├── Responsive design
│   ├── Mode switching
│   ├── Bulk grid layout
│   ├── Progress bars
│   └── Animations
│
└── README.md           # Documentation (this file)
```

## Future Enhancements

Potential features for future development:

### Image Processing
- [ ] Additional interpolation methods (Lanczos, Mitchell)
- [ ] Advanced sharpening algorithms (Unsharp Mask with radius)
- [ ] Noise reduction filters
- [ ] Color adjustments (brightness, contrast, saturation)
- [ ] Batch processing with different settings per image

### Tracing & Vectorization
- [ ] Potrace algorithm integration
- [ ] True vector path generation
- [ ] SVG export format
- [ ] Bezier curve optimization
- [ ] Multi-path vectorization

### Export & Formats
- [ ] WebP export
- [ ] TIFF export
- [ ] SVG vector export
- [ ] PDF export
- [ ] Compression options

### User Experience
- [ ] Preset configurations (Save/Load settings)
- [ ] Before/After slider comparison
- [ ] Zoom and pan on preview
- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts

### Advanced Features
- [ ] AI upscaling integration (via API)
- [ ] Cloud storage integration
- [ ] Batch watermarking
- [ ] Image metadata preservation
- [ ] Processing history

### Performance
- [ ] Web Workers for processing
- [ ] Progressive rendering
- [ ] Memory optimization
- [ ] Caching processed results

## Limitations

### What This Tool CANNOT Do

1. **Add Real Detail**: Mathematical interpolation cannot create true details, only guesses
2. **Match AI Quality**: Results won't match AI-based upscaling tools
3. **Professional Printing**: Not suitable for high-end print production
4. **Stock Photography**: Unlikely to meet commercial stock photo quality requirements
5. **Extreme Upscaling**: 8x+ upscaling will show significant quality loss

### What This Tool CAN Do Well

1. **Quick Resizing**: Fast browser-based upscaling for web use
2. **Pixel Art**: Perfect for retro graphics with nearest neighbor
3. **Batch Processing**: Efficiently handle multiple images
4. **Learning Tool**: Understand interpolation algorithms
5. **No Privacy Concerns**: All processing happens locally

## Alternatives for Professional Use

If you need higher quality upscaling:

### AI-Powered Desktop Applications

**Open Source Options:**
- Real-ESRGAN based tools
- Free and powerful
- Requires compatible GPU

**Commercial Solutions:**
- Professional AI upscaling software
- Best-in-class quality
- Paid licenses
- Desktop applications

**Image Editing Suites:**
- Professional photo editors with AI features
- Part of creative software bundles
- Good but not specialized

### Online Services

Various online AI upscaling services are available that offer:
- Cloud-based processing
- No installation required
- Subscription or pay-per-use models
- API integration options

### When to Use Each

**This Tool:**
- Quick web graphics
- Batch processing many images
- Learning interpolation
- No privacy concerns
- Free and instant

**AI Tools:**
- Professional print work
- Significant upscaling (4x+)
- Maximum quality needed
- Photo restoration
- Commercial projects

## Credits & Attribution

**Developer:** Claude Code User
**Created:** 2025
**Technology Stack:**
- HTML5 Canvas API
- Vanilla JavaScript (ES6+)
- CSS3 with Flexbox/Grid
- JSZip library by Stuart Knightley

**Inspired by:**
- Real-ESRGAN AI upscaling research
- Modern image processing techniques
- Traditional interpolation algorithms

## License

This project is provided as-is for educational and personal use.

**Permissions:**
- ✅ Personal use
- ✅ Educational use
- ✅ Modification and customization
- ✅ Local deployment

**Restrictions:**
- ⚠️ Commercial use: Contact developer
- ⚠️ Redistribution: Provide attribution
- ⚠️ Liability: No warranty provided

**Third-Party Libraries:**
- JSZip: MIT License

## Support & Contributions

**Found a bug?**
- Check the Troubleshooting section first
- Open an issue with details

**Want to contribute?**
- Fork the repository
- Create a feature branch
- Submit pull request

**Questions?**
- Review this documentation
- Check browser console for errors
- Search for similar issues

---

**Disclaimer:** This tool uses mathematical interpolation, not AI. Results may not match professional AI upscaling tools. For commercial stock photography or professional printing, use original high-resolution images or AI-based upscalers. Always verify quality requirements before submission.

**Version:** 1.0.0
**Last Updated:** October 2025

© 2025 Image Upscaler & Converter | Made with HTML5 Canvas API
