// Global variables
let originalImage = null;
let processedImage = null;
let selectedFormat = 'eps';
let currentMode = 'single'; // 'single' or 'bulk'
let bulkImages = []; // Store bulk images
let bulkProcessedImages = []; // Store processed bulk images

// DOM Elements
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const controlsSection = document.getElementById('controlsSection');
const originalCanvas = document.getElementById('originalCanvas');
const resultCanvas = document.getElementById('resultCanvas');
const originalInfo = document.getElementById('originalInfo');
const resultInfo = document.getElementById('resultInfo');
const loadingSpinner = document.getElementById('loadingSpinner');
const processBtn = document.getElementById('processBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const scaleFactorSlider = document.getElementById('scaleFactorSlider');
const scaleFactorValue = document.getElementById('scaleFactorValue');
const enableTracing = document.getElementById('enableTracing');
const tracingControls = document.getElementById('tracingControls');
const thresholdSlider = document.getElementById('thresholdSlider');
const thresholdValue = document.getElementById('thresholdValue');
const jpegQualityControl = document.getElementById('jpegQualityControl');
const jpegQuality = document.getElementById('jpegQuality');
const jpegQualityValue = document.getElementById('jpegQualityValue');

// Bulk mode elements
const bulkUploadBox = document.getElementById('bulkUploadBox');
const bulkFileInput = document.getElementById('bulkFileInput');
const bulkImageList = document.getElementById('bulkImageList');
const bulkControls = document.getElementById('bulkControls');
const bulkProcessBtn = document.getElementById('bulkProcessBtn');
const bulkDownloadBtn = document.getElementById('bulkDownloadBtn');
const bulkResetBtn = document.getElementById('bulkResetBtn');
const bulkProgress = document.getElementById('bulkProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const singleUploadSection = document.getElementById('singleUploadSection');
const bulkUploadSection = document.getElementById('bulkUploadSection');

// Event Listeners
uploadBox.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
processBtn.addEventListener('click', processImage);
downloadBtn.addEventListener('click', downloadResult);
resetBtn.addEventListener('click', reset);

// Bulk mode event listeners
bulkUploadBox.addEventListener('click', () => bulkFileInput.click());
bulkFileInput.addEventListener('change', handleBulkFileSelect);
bulkProcessBtn.addEventListener('click', processBulkImages);
bulkDownloadBtn.addEventListener('click', downloadBulkAsZip);
bulkResetBtn.addEventListener('click', resetBulk);

// Mode selector
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const mode = e.target.dataset.mode;
        switchMode(mode);
    });
});

// Drag and drop - Single mode
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Drag and drop - Bulk mode
bulkUploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    bulkUploadBox.classList.add('dragover');
});

bulkUploadBox.addEventListener('dragleave', () => {
    bulkUploadBox.classList.remove('dragover');
});

bulkUploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    bulkUploadBox.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    handleBulkFiles(files);
});

// Slider updates
scaleFactorSlider.addEventListener('input', (e) => {
    scaleFactorValue.textContent = e.target.value;
});

thresholdSlider.addEventListener('input', (e) => {
    thresholdValue.textContent = e.target.value;
});

jpegQuality.addEventListener('input', (e) => {
    jpegQualityValue.textContent = e.target.value;
});

// Tracing toggle
enableTracing.addEventListener('change', (e) => {
    tracingControls.style.display = e.target.checked ? 'block' : 'none';
});

// Format buttons
document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        selectedFormat = e.target.dataset.format;
        jpegQualityControl.style.display = selectedFormat === 'jpeg' ? 'block' : 'none';
    });
});

// File handling
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            originalImage = img;
            displayOriginalImage();
            previewSection.style.display = 'block';
            controlsSection.style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayOriginalImage() {
    const ctx = originalCanvas.getContext('2d');
    const maxSize = 400;
    let width = originalImage.width;
    let height = originalImage.height;

    if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width *= ratio;
        height *= ratio;
    }

    originalCanvas.width = width;
    originalCanvas.height = height;
    ctx.drawImage(originalImage, 0, 0, width, height);

    originalInfo.textContent = `${originalImage.width} × ${originalImage.height} px`;
}

// Image Processing
async function processImage() {
    loadingSpinner.style.display = 'block';
    processBtn.disabled = true;

    // Use setTimeout to allow UI to update
    setTimeout(() => {
        try {
            const scaleFactor = parseFloat(scaleFactorSlider.value);
            const method = document.getElementById('interpolationMethod').value;
            const sharpen = document.getElementById('sharpenCheckbox').checked;
            const doTracing = enableTracing.checked;

            // Create upscaled image
            const upscaled = upscaleImage(originalImage, scaleFactor, method);

            // Apply sharpening if enabled
            let result = sharpen ? sharpenImage(upscaled) : upscaled;

            // Apply tracing if enabled
            if (doTracing) {
                const threshold = parseInt(thresholdSlider.value);
                const colors = parseInt(document.getElementById('colorCount').value);
                result = traceImage(result, threshold, colors);
            }

            processedImage = result;
            displayResult();
            downloadBtn.style.display = 'inline-block';
        } catch (error) {
            alert('Error processing image: ' + error.message);
        } finally {
            loadingSpinner.style.display = 'none';
            processBtn.disabled = false;
        }
    }, 100);
}

function upscaleImage(img, scale, method) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const newWidth = Math.floor(img.width * scale);
    const newHeight = Math.floor(img.height * scale);

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Set interpolation method
    if (method === 'nearest') {
        ctx.imageSmoothingEnabled = false;
    } else {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = method === 'bicubic' ? 'high' : 'medium';
    }

    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    return canvas;
}

function sharpenImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sharpening kernel
    const kernel = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];

    const output = new Uint8ClampedArray(data.length);
    const w = canvas.width;
    const h = canvas.height;

    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * w + (x + kx)) * 4 + c;
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        sum += data[idx] * kernel[kernelIdx];
                    }
                }
                output[(y * w + x) * 4 + c] = sum;
            }
            output[(y * w + x) * 4 + 3] = data[(y * w + x) * 4 + 3]; // Alpha
        }
    }

    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = canvas.width;
    resultCanvas.height = canvas.height;
    const resultCtx = resultCanvas.getContext('2d');
    const resultImageData = new ImageData(output, w, h);
    resultCtx.putImageData(resultImageData, 0, 0);

    return resultCanvas;
}

function traceImage(canvas, threshold, colorCount) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Simple posterization (color reduction)
    const levels = 256 / colorCount;

    for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale if 2 colors
        if (colorCount === 2) {
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const value = gray > threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
        } else {
            // Posterize each channel
            data[i] = Math.floor(data[i] / levels) * levels;
            data[i + 1] = Math.floor(data[i + 1] / levels) * levels;
            data[i + 2] = Math.floor(data[i + 2] / levels) * levels;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

function displayResult() {
    const ctx = resultCanvas.getContext('2d');
    const maxSize = 400;
    let width = processedImage.width;
    let height = processedImage.height;

    if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width *= ratio;
        height *= ratio;
    }

    resultCanvas.width = width;
    resultCanvas.height = height;
    ctx.drawImage(processedImage, 0, 0, width, height);

    resultInfo.textContent = `${processedImage.width} × ${processedImage.height} px`;
}

// Download functionality
function downloadResult() {
    if (!processedImage) return;

    switch (selectedFormat) {
        case 'png':
            downloadPNG();
            break;
        case 'jpeg':
            downloadJPEG();
            break;
        case 'eps':
            downloadEPS();
            break;
    }
}

function downloadPNG() {
    processedImage.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `upscaled_${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}

function downloadJPEG() {
    const quality = parseInt(jpegQuality.value) / 100;
    processedImage.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `upscaled_${Date.now()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/jpeg', quality);
}

function downloadEPS() {
    const ctx = processedImage.getContext('2d');
    const imageData = ctx.getImageData(0, 0, processedImage.width, processedImage.height);
    const data = imageData.data;

    // Generate EPS file content
    let eps = `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${processedImage.width} ${processedImage.height}
%%Title: Upscaled Image
%%Creator: Image Upscaler & Converter
%%CreationDate: ${new Date().toISOString()}
%%EndComments

/pix ${processedImage.width} def
/piy ${processedImage.height} def

% Image data
pix piy 8 [pix 0 0 piy neg 0 piy]
{currentfile picstr readhexstring pop}
false 3 colorimage

`;

    // Convert image data to hex
    let hexData = '';
    for (let i = 0; i < data.length; i += 4) {
        hexData += toHex(data[i]) + toHex(data[i + 1]) + toHex(data[i + 2]);
        if ((i / 4) % 20 === 19) hexData += '\n';
    }

    eps += `/picstr ${processedImage.width * 3} string def\n`;
    eps += hexData + '\n';
    eps += '\n%%EOF';

    const blob = new Blob([eps], { type: 'application/postscript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upscaled_${Date.now()}.eps`;
    a.click();
    URL.revokeObjectURL(url);
}

function toHex(value) {
    return value.toString(16).padStart(2, '0');
}

function reset() {
    originalImage = null;
    processedImage = null;
    previewSection.style.display = 'none';
    controlsSection.style.display = 'none';
    downloadBtn.style.display = 'none';
    fileInput.value = '';
}

// ===== BULK MODE FUNCTIONS =====

function switchMode(mode) {
    currentMode = mode;

    if (mode === 'single') {
        singleUploadSection.style.display = 'block';
        bulkUploadSection.style.display = 'none';
        bulkControls.style.display = 'none';
        previewSection.style.display = originalImage ? 'block' : 'none';
        document.querySelector('.action-buttons').style.display = 'flex';
    } else {
        singleUploadSection.style.display = 'none';
        bulkUploadSection.style.display = 'block';
        previewSection.style.display = 'none';
        document.querySelector('.action-buttons').style.display = 'none';
        bulkControls.style.display = 'block';
    }
}

function handleBulkFileSelect(e) {
    const files = Array.from(e.target.files);
    handleBulkFiles(files);
}

function handleBulkFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
        alert('Please upload at least one image file');
        return;
    }

    // Clear previous images
    bulkImages = [];
    bulkImageList.innerHTML = '';

    // Load all images
    imageFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                bulkImages.push({
                    name: file.name,
                    image: img,
                    processed: null,
                    index: index
                });
                displayBulkImage(file.name, img, index);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    controlsSection.style.display = 'block';
}

function displayBulkImage(name, img, index) {
    const item = document.createElement('div');
    item.className = 'bulk-image-item';
    item.dataset.index = index;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const maxSize = 150;
    let width = img.width;
    let height = img.height;

    if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width *= ratio;
        height *= ratio;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const info = document.createElement('div');
    info.className = 'bulk-image-info';
    info.innerHTML = `
        <p class="image-name">${name}</p>
        <p class="image-size">${img.width} × ${img.height}</p>
        <span class="status-badge pending">Pending</span>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => removeBulkImage(index);

    item.appendChild(canvas);
    item.appendChild(info);
    item.appendChild(removeBtn);
    bulkImageList.appendChild(item);
}

function removeBulkImage(index) {
    bulkImages = bulkImages.filter(img => img.index !== index);
    const item = bulkImageList.querySelector(`[data-index="${index}"]`);
    if (item) item.remove();

    if (bulkImages.length === 0) {
        controlsSection.style.display = 'none';
        bulkDownloadBtn.style.display = 'none';
    }
}

async function processBulkImages() {
    if (bulkImages.length === 0) {
        alert('Please upload images first');
        return;
    }

    bulkProcessBtn.disabled = true;
    bulkProgress.style.display = 'block';
    bulkProcessedImages = [];

    const scaleFactor = parseFloat(scaleFactorSlider.value);
    const method = document.getElementById('interpolationMethod').value;
    const sharpen = document.getElementById('sharpenCheckbox').checked;
    const doTracing = enableTracing.checked;
    const threshold = parseInt(thresholdSlider.value);
    const colors = parseInt(document.getElementById('colorCount').value);

    for (let i = 0; i < bulkImages.length; i++) {
        const imgData = bulkImages[i];

        // Update progress
        progressFill.style.width = `${((i) / bulkImages.length) * 100}%`;
        progressText.textContent = `Processing: ${i + 1} / ${bulkImages.length}`;

        // Update status badge
        const item = bulkImageList.querySelector(`[data-index="${imgData.index}"]`);
        const badge = item.querySelector('.status-badge');
        badge.textContent = 'Processing...';
        badge.className = 'status-badge processing';

        // Process image
        await new Promise(resolve => setTimeout(resolve, 50)); // Allow UI update

        try {
            let result = upscaleImage(imgData.image, scaleFactor, method);
            if (sharpen) result = sharpenImage(result);
            if (doTracing) result = traceImage(result, threshold, colors);

            bulkProcessedImages.push({
                name: imgData.name,
                canvas: result
            });

            imgData.processed = result;

            // Update status
            badge.textContent = 'Done';
            badge.className = 'status-badge done';
        } catch (error) {
            badge.textContent = 'Error';
            badge.className = 'status-badge error';
            console.error(`Error processing ${imgData.name}:`, error);
        }
    }

    // Complete
    progressFill.style.width = '100%';
    progressText.textContent = `Completed: ${bulkProcessedImages.length} / ${bulkImages.length}`;
    bulkProcessBtn.disabled = false;
    bulkDownloadBtn.style.display = 'inline-block';
}

async function downloadBulkAsZip() {
    if (bulkProcessedImages.length === 0) {
        alert('No processed images to download');
        return;
    }

    if (typeof JSZip === 'undefined') {
        alert('JSZip library not loaded. Please refresh the page.');
        return;
    }

    bulkDownloadBtn.disabled = true;
    bulkDownloadBtn.textContent = 'Creating ZIP...';

    const zip = new JSZip();
    const folder = zip.folder('upscaled_images');

    for (let i = 0; i < bulkProcessedImages.length; i++) {
        const imgData = bulkProcessedImages[i];

        // Get blob based on format
        const blob = await getImageBlob(imgData.canvas);

        // Get filename without extension
        const nameWithoutExt = imgData.name.replace(/\.[^/.]+$/, '');
        let filename = `${nameWithoutExt}_upscaled`;

        // Add appropriate extension
        switch (selectedFormat) {
            case 'png':
                filename += '.png';
                break;
            case 'jpeg':
                filename += '.jpg';
                break;
            case 'eps':
                filename += '.eps';
                break;
        }

        folder.file(filename, blob);
    }

    // Generate ZIP
    zip.generateAsync({ type: 'blob' })
        .then((content) => {
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `upscaled_images_${Date.now()}.zip`;
            a.click();
            URL.revokeObjectURL(url);

            bulkDownloadBtn.disabled = false;
            bulkDownloadBtn.textContent = 'Download All (ZIP)';
        });
}

function getImageBlob(canvas) {
    return new Promise((resolve) => {
        switch (selectedFormat) {
            case 'png':
                canvas.toBlob((blob) => resolve(blob), 'image/png');
                break;
            case 'jpeg':
                const quality = parseInt(jpegQuality.value) / 100;
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
                break;
            case 'eps':
                const epsContent = generateEPS(canvas);
                const blob = new Blob([epsContent], { type: 'application/postscript' });
                resolve(blob);
                break;
        }
    });
}

function generateEPS(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let eps = `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${canvas.width} ${canvas.height}
%%Title: Upscaled Image
%%Creator: Image Upscaler & Converter
%%CreationDate: ${new Date().toISOString()}
%%EndComments

/pix ${canvas.width} def
/piy ${canvas.height} def

% Image data
pix piy 8 [pix 0 0 piy neg 0 piy]
{currentfile picstr readhexstring pop}
false 3 colorimage

`;

    let hexData = '';
    for (let i = 0; i < data.length; i += 4) {
        hexData += toHex(data[i]) + toHex(data[i + 1]) + toHex(data[i + 2]);
        if ((i / 4) % 20 === 19) hexData += '\n';
    }

    eps += `/picstr ${canvas.width * 3} string def\n`;
    eps += hexData + '\n';
    eps += '\n%%EOF';

    return eps;
}

function resetBulk() {
    bulkImages = [];
    bulkProcessedImages = [];
    bulkImageList.innerHTML = '';
    bulkProgress.style.display = 'none';
    bulkDownloadBtn.style.display = 'none';
    bulkFileInput.value = '';
    controlsSection.style.display = 'none';
    progressFill.style.width = '0%';
    progressText.textContent = 'Processing: 0 / 0';
}
