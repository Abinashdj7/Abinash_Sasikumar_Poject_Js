const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

/**
 * @param {string} imagePath 
 * @param {string} outputPath 
 */
const optimizeImage = async (imagePath, outputPath) => {
  try {
    await sharp(imagePath)
      .resize(800)  
      .webp({ quality: 75 }) 
      .toFile(outputPath); 
    console.log("Image optimized and saved successfully!");
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

/**
 * @param {string} imagePath 
 */
const deleteOriginalImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting the original image:", err);
    } else {
      console.log("Original image deleted.");
    }
  });
};

module.exports = { optimizeImage, deleteOriginalImage };
