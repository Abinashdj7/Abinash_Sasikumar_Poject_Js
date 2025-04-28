const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const processImage = async (originalFilePath) => {
  try {
    const timestamp = Date.now();
    const optimizedFilePath = path.join('uploads', `${timestamp}-optimized.webp`);  // Define a unique file path for the optimized image
    
    // Read the image file buffer
    const imageBuffer = fs.readFileSync(originalFilePath);

    // Process and save the image
    await sharp(imageBuffer)
      .resize(800)  // Resize if needed
      .webp({ quality: 75 })  // Convert to WebP format with 75% quality
      .toFile(optimizedFilePath);  // Save the processed image

    console.log('Optimized image saved at:', optimizedFilePath);  // Log the actual saved path

    // Proceed to delete the original file if it exists
    if (fs.existsSync(originalFilePath)) {
      fs.unlinkSync(originalFilePath);  // Delete the original image
      console.log('Original image deleted successfully.');
    } else {
      console.log('Original file not found:', originalFilePath);
    }

    return optimizedFilePath;  // Return the path of the optimized image
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Error processing image');
  }
};

module.exports = { processImage };
