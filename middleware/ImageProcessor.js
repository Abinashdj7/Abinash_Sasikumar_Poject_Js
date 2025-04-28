const sharp = require('sharp');

const processImage = async (imageBuffer) => {
  try {
    const processedImage = await sharp(imageBuffer)
      .resize(800)
      .webp({ quality: 75 }) 
      .toBuffer(); 

    return processedImage;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Error processing image');
  }
};

module.exports = { processImage };
