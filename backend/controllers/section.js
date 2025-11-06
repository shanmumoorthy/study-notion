// const Course = require('../models/course');
// const Section = require('../models/section');

// // ================ create Section ================
// exports.createSection = async (req, res) => {
//     try {
//         // extract data 
//         const { sectionName, courseId } = req.body;
//         // console.log('sectionName, courseId = ', sectionName, ",  = ", courseId)

//         // validation
//         if (!sectionName || !courseId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required'
//             })
//         }

//         // create entry in DB
//         const newSection = await Section.create({ sectionName });

//         // link - section id to current course 
//         const updatedCourse = await Course.findByIdAndUpdate(courseId,
//             {
//                 $push: {
//                     courseContent: newSection._id
//                 }
//             },
//             { new: true }
//         );

//         const updatedCourseDetails = await Course.findById(courseId)
//             .populate({
//                 path: 'courseContent',
//                 populate: {
//                     path: 'subSection'
//                 }

//             })

//         // above -- populate remaining 

//         res.status(200).json({
//             success: true,
//             updatedCourseDetails,
//             message: 'Section created successfully'
//         })
//     }

//     catch (error) {
//         console.log('Error while creating section');
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: 'Error while creating section'
//         })
//     }
// }


// // ================ update Section ================
// exports.updateSection = async (req, res) => {
//     try {
//         // extract data
//         const { sectionName, sectionId, courseId } = req.body;

//         // validation
//         if (!sectionId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required'
//             });
//         }

//         // update section name in DB
//         await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

//         const updatedCourseDetails = await Course.findById(courseId)
//             .populate({
//                 path: 'courseContent',
//                 populate: {
//                     path: 'subSection'
//                 }
//             })

//         res.status(200).json({
//             success: true,
//             data:updatedCourseDetails,
//             message: 'Section updated successfully'
//         });
//     }
//     catch (error) {
//         console.log('Error while updating section');
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: 'Error while updating section'
//         })
//     }
// }



// // ================ Delete Section ================
// exports.deleteSection = async (req, res) => {
//     try {
//         const { sectionId, courseId } = req.body;
//         // console.log('sectionId = ', sectionId);

//         // delete section by id from DB
//         await Section.findByIdAndDelete(sectionId);

//         const updatedCourseDetails = await Course.findById(courseId)
//             .populate({
//                 path: 'courseContent',
//                 populate: {
//                     path: 'subSection'
//                 }
//             })

//         res.status(200).json({
//             success: true,
//             data: updatedCourseDetails,
//             message: 'Section deleted successfully'
//         })
//     }
//     catch (error) {
//         console.log('Error while deleting section');
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: 'Error while deleting section'
//         })
//     }
// }

const Course = require('../models/course');
const Section = require('../models/section');

// ================= CREATE SECTION =================
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) return res.status(400).json({ success: false, message: 'All fields are required' });

    const newSection = await Section.create({ sectionName });

    // Link section to course
    await Course.findByIdAndUpdate(courseId, { $push: { courseContent: newSection._id } });

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: 'courseContent', populate: { path: 'subSection' } });

    return res.status(201).json({
      success: true,
      data: updatedCourse,
      message: 'Section created successfully',
    });
  } catch (error) {
    console.error('Error creating section:', error);
    return res.status(500).json({
      success: false,
      message: 'Error while creating section',
      error: error.message,
    });
  }
};

// ================= UPDATE SECTION =================
exports.updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName, courseId } = req.body;
    if (!sectionId) return res.status(400).json({ success: false, message: 'Section ID is required' });

    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: 'courseContent', populate: { path: 'subSection' } });

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: 'Section updated successfully',
    });
  } catch (error) {
    console.error('Error updating section:', error);
    return res.status(500).json({
      success: false,
      message: 'Error while updating section',
      error: error.message,
    });
  }
};

// ================= DELETE SECTION =================
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    // Delete all subSections linked to section
    const section = await Section.findById(sectionId);
    if (section) {
      await SubSection.deleteMany({ _id: { $in: section.subSection } });
    }

    await Section.findByIdAndDelete(sectionId);
    await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } });

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: 'courseContent', populate: { path: 'subSection' } });

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: 'Section deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    return res.status(500).json({
      success: false,
      message: 'Error while deleting section',
      error: error.message,
    });
  }
};
