// // const Section = require('../models/section');
// // const SubSection = require('../models/subSection');
// // const { uploadImageToCloudinary } = require('../utils/imageUploader');



// // // ================ create SubSection ================
// // exports.createSubSection = async (req, res) => {
// //     try {
// //         // extract data
// //         const { title, description, sectionId } = req.body;

// //         // extract video file
// //         const videoFile = req.files.video
// //         // console.log('videoFile ', videoFile)

// //         // validation
// //         if (!title || !description || !videoFile || !sectionId) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'All fields are required'
// //             })
// //         }

// //         // upload video to cloudinary
// //         const videoFileDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

// //         // create entry in DB
// //         const SubSectionDetails = await SubSection.create(
// //             { title, timeDuration: videoFileDetails.duration, description, videoUrl: videoFileDetails.secure_url })

// //         // link subsection id to section
// //         // Update the corresponding section with the newly created sub-section
// //         const updatedSection = await Section.findByIdAndUpdate(
// //             { _id: sectionId },
// //             { $push: { subSection: SubSectionDetails._id } },
// //             { new: true }
// //         ).populate("subSection")

// //         // return response
// //         res.status(200).json({
// //             success: true,
// //             data: updatedSection,
// //             message: 'SubSection created successfully'
// //         });
// //     }
// //     catch (error) {
// //         console.log('Error while creating SubSection');
// //         console.log(error);
// //         res.status(500).json({
// //             success: false,
// //             error: error.message,
// //             message: 'Error while creating SubSection'
// //         })
// //     }
// // }



// // // ================ Update SubSection ================
// // exports.updateSubSection = async (req, res) => {
// //     try {
// //         const { sectionId, subSectionId, title, description } = req.body;

// //         // validation
// //         if (!subSectionId) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'subSection ID is required to update'
// //             });
// //         }

// //         // find in DB
// //         const subSection = await SubSection.findById(subSectionId);

// //         if (!subSection) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "SubSection not found",
// //             })
// //         }

// //         // add data
// //         if (title) {
// //             subSection.title = title;
// //         }

// //         if (description) {
// //             subSection.description = description;
// //         }

// //         // upload video to cloudinary
// //         if (req.files && req.files.videoFile !== undefined) {
// //             const video = req.files.videoFile;
// //             const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
// //             subSection.videoUrl = uploadDetails.secure_url;
// //             subSection.timeDuration = uploadDetails.duration;
// //         }

// //         // save data to DB
// //         await subSection.save();

// //         const updatedSection = await Section.findById(sectionId).populate("subSection")

// //         return res.json({
// //             success: true,
// //             data: updatedSection,
// //             message: "Section updated successfully",
// //         });
// //     }
// //     catch (error) {
// //         console.error('Error while updating the section')
// //         console.error(error)
// //         return res.status(500).json({
// //             success: false,
// //             error: error.message,
// //             message: "Error while updating the section",
// //         })
// //     }
// // }



// // // ================ Delete SubSection ================
// // exports.deleteSubSection = async (req, res) => {
// //     try {
// //         const { subSectionId, sectionId } = req.body
// //         await Section.findByIdAndUpdate(
// //             { _id: sectionId },
// //             {
// //                 $pull: {
// //                     subSection: subSectionId,
// //                 },
// //             }
// //         )

// //         // delete from DB
// //         const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

// //         if (!subSection) {
// //             return res
// //                 .status(404)
// //                 .json({ success: false, message: "SubSection not found" })
// //         }

// //         const updatedSection = await Section.findById(sectionId).populate('subSection')

// //         // In frontned we have to take care - when subsection is deleted we are sending ,
// //         // only section data not full course details as we do in others 

// //         // success response
// //         return res.json({
// //             success: true,
// //             data: updatedSection,
// //             message: "SubSection deleted successfully",
// //         })
// //     } catch (error) {
// //         console.error(error)
// //         return res.status(500).json({
// //             success: false,

// //             error: error.message,
// //             message: "An error occurred while deleting the SubSection",
// //         })
// //     }
// // }
// const Section = require('../models/section');
// const SubSection = require('../models/subSection');
// const { uploadImageToCloudinary, deleteResourceFromCloudinary } = require('../utils/imageUploader');

// // ================= CREATE SUBSECTION =================
// exports.createSubSection = async (req, res) => {
//   try {
//     const { title, description, sectionId } = req.body;
//     const videoFile = req.files?.video;

//     // Validation
//     if (!title || !description || !videoFile || !sectionId) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required',
//       });
//     }

//     // Upload video
//     const uploadDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME, "video");

//     // Create SubSection
//     const subSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//       videoPublicId: uploadDetails.public_id,
//       timeDuration: uploadDetails.duration,
//     });

//     // Link to Section
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { subSection: subSection._id } },
//       { new: true }
//     ).populate('subSection');

//     return res.status(201).json({
//       success: true,
//       data: updatedSection,
//       message: 'SubSection created successfully',
//     });
//   } catch (error) {
//     console.error('Error creating SubSection:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error while creating SubSection',
//       error: error.message,
//     });
//   }
// };

// // ================= UPDATE SUBSECTION =================
// exports.updateSubSection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId, title, description } = req.body;
//     if (!subSectionId) return res.status(400).json({ success: false, message: 'SubSection ID is required' });

//     const subSection = await SubSection.findById(subSectionId);
//     if (!subSection) return res.status(404).json({ success: false, message: 'SubSection not found' });

//     if (title) subSection.title = title;
//     if (description) subSection.description = description;

//     if (req.files?.videoFile) {
//       // Delete old video
//       if (subSection.videoPublicId) {
//         await deleteResourceFromCloudinary(subSection.videoPublicId, "video");
//       }

//       const uploadDetails = await uploadImageToCloudinary(req.files.videoFile, process.env.FOLDER_NAME, "video");
//       subSection.videoUrl = uploadDetails.secure_url;
//       subSection.videoPublicId = uploadDetails.public_id;
//       subSection.timeDuration = uploadDetails.duration;
//     }

//     await subSection.save();

//     const updatedSection = await Section.findById(sectionId).populate('subSection');
//     return res.status(200).json({
//       success: true,
//       data: updatedSection,
//       message: 'SubSection updated successfully',
//     });
//   } catch (error) {
//     console.error('Error updating SubSection:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error while updating SubSection',
//       error: error.message,
//     });
//   }
// };

// // ================= DELETE SUBSECTION =================
// exports.deleteSubSection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId } = req.body;

//     const subSection = await SubSection.findById(subSectionId);
//     if (!subSection) return res.status(404).json({ success: false, message: 'SubSection not found' });

//     // Delete video from Cloudinary
//     if (subSection.videoPublicId) {
//       await deleteResourceFromCloudinary(subSection.videoPublicId, "video");
//     }

//     await SubSection.findByIdAndDelete(subSectionId);
//     await Section.findByIdAndUpdate(sectionId, { $pull: { subSection: subSectionId } });

//     const updatedSection = await Section.findById(sectionId).populate('subSection');

//     return res.status(200).json({
//       success: true,
//       data: updatedSection,
//       message: 'SubSection deleted successfully',
//     });
//   } catch (error) {
//     console.error('Error deleting SubSection:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error while deleting SubSection',
//       error: error.message,
//     });
//   }
// };
const Section = require('../models/section');
const SubSection = require('../models/subSection');
const { uploadImageToCloudinary, deleteResourceFromCloudinary } = require('../utils/imageUploader');

// ================= CREATE SUBSECTION =================
exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId, videoUrl } = req.body; // videoUrl is optional
    const videoFile = req.files?.video;

    // Validation: require either videoFile or videoUrl
    if (!title || !description || !sectionId || (!videoFile && !videoUrl)) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (title, description, sectionId, and video)',
      });
    }

    let finalVideoUrl = videoUrl;
    let videoPublicId = null;
    let timeDuration = null;

    // If a file is uploaded, upload to Cloudinary
    if (videoFile) {
      const uploadDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME, "video");
      finalVideoUrl = uploadDetails.secure_url;
      videoPublicId = uploadDetails.public_id;
      timeDuration = uploadDetails.duration;
    }

    // Create SubSection
    const subSection = await SubSection.create({
      title,
      description,
      videoUrl: finalVideoUrl,
      videoPublicId,
      timeDuration,
    });

    // Link to Section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSection._id } },
      { new: true }
    ).populate('subSection');

    return res.status(201).json({
      success: true,
      data: updatedSection,
      message: 'SubSection created successfully',
    });

  } catch (error) {
    console.error('Error creating SubSection:', error);
    return res.status(500).json({
      success: false,
      message: 'Error while creating SubSection',
      error: error.message,
    });
  }
};

// ================= UPDATE SUBSECTION =================
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, title, description, videoUrl } = req.body; // videoUrl optional
    if (!subSectionId) return res.status(400).json({ success: false, message: 'SubSection ID is required' });

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) return res.status(404).json({ success: false, message: 'SubSection not found' });

    if (title) subSection.title = title;
    if (description) subSection.description = description;

    const videoFile = req.files?.videoFile;

    // If a new file is uploaded, delete old video and upload new
    if (videoFile) {
      if (subSection.videoPublicId) {
        await deleteResourceFromCloudinary(subSection.videoPublicId, "video");
      }
      const uploadDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME, "video");
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.videoPublicId = uploadDetails.public_id;
      subSection.timeDuration = uploadDetails.duration;
    } 
    // If a new video URL is provided, replace URL and clear publicId/duration
    else if (videoUrl) {
      if (subSection.videoPublicId) {
        await deleteResourceFromCloudinary(subSection.videoPublicId, "video");
      }
      subSection.videoUrl = videoUrl;
      subSection.videoPublicId = null;
      subSection.timeDuration = null;
    }

    await subSection.save();

    // Populate updated section
    const updatedSection = await Section.findById(sectionId).populate('subSection');
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: 'SubSection updated successfully',
    });

  } catch (error) {
    console.error('Error updating SubSection:', error);
    return res.status(500).json({
      success: false,
      message: 'Error while updating SubSection',
      error: error.message,
    });
  }
};

// ================= DELETE SUBSECTION =================
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) return res.status(404).json({ success: false, message: 'SubSection not found' });

    // Delete video from Cloudinary if exists
    if (subSection.videoPublicId) {
      await deleteResourceFromCloudinary(subSection.videoPublicId, "video");
    }

    await SubSection.findByIdAndDelete(subSectionId);
    await Section.findByIdAndUpdate(sectionId, { $pull: { subSection: subSectionId } });

    const updatedSection = await Section.findById(sectionId).populate('subSection');

    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: 'SubSection deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting SubSection:', error);
    return res.status(500).json({
      success: false,
      message: 'Error while deleting SubSection',
      error: error.message,
    });
  }
};
