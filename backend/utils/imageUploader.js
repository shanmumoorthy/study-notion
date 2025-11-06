// const cloudinary = require('cloudinary').v2;

// exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
//     try {
//         const options = { folder };
//         if (height) options.height = height;
//         if (quality) options.quality = quality;

//         // options.resourse_type = 'auto';
//         options.resource_type = 'auto';
//         return await cloudinary.uploader.upload(file.tempFilePath, options);
//     }
//     catch (error) {
//         console.log("Error while uploading image");
//         console.log(error);
//     }
// }



// // Function to delete a resource by public ID
// exports.deleteResourceFromCloudinary = async (url) => {
//     if (!url) return;

//     try {
//         const result = await cloudinary.uploader.destroy(url);
//         console.log(`Deleted resource with public ID: ${url}`);
//         console.log('Delete Resourse result = ', result)
//         return result;
//     } catch (error) {
//         console.error(`Error deleting resource with public ID ${url}:`, error);
//         throw error;
//     }
// };
// const cloudinary = require('cloudinary').v2;

// exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
//   try {
//     const options = { folder };
//     if (height) options.height = height;
//     if (quality) options.quality = quality;

//     options.resource_type = 'auto';

//     const result = await cloudinary.uploader.upload(file.tempFilePath, options);

//     // Return both URL + Public ID
//     return {
//       secure_url: result.secure_url,
//       public_id: result.public_id,
//     };
//   } catch (error) {
//     console.log("Error while uploading image");
//     console.log(error);
//     throw error;
//   }
// };

// // Function to delete a resource by public ID
// exports.deleteResourceFromCloudinary = async (publicId) => {
//   if (!publicId) return;

//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     console.log(`Deleted resource with public ID: ${publicId}`);
//     return result;
//   } catch (error) {
//     console.error(`Error deleting resource with public ID ${publicId}:`, error);
//     throw error;
//   }
// };
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload image/video to Cloudinary
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder, resource_type: 'auto' }; // auto detects image/video
    if (height) options.height = height;
    if (quality) options.quality = quality;

    const result = await cloudinary.uploader.upload(file.tempFilePath || file.path, options);
    return result;
  } catch (error) {
    console.error('Error while uploading file to Cloudinary:', error);
    throw new Error('Cloudinary upload failed');
  }
};

// Delete resource from Cloudinary by public ID
exports.deleteResourceFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`Deleted resource with public ID: ${publicId}`, result);
    return result;
  } catch (error) {
    console.error(`Error deleting resource with public ID ${publicId}:`, error);
    throw error;
  }
};
