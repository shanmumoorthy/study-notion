// const nodemailer = require('nodemailer');

// const mailSender = async (email, title, body) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS
//             }
//         });

//         const info = await transporter.sendMail({
//             from: 'StudyNotion || by shanmugapriya',
//             to: email,
//             subject: title,
//             html: body
//         });

//         // console.log('Info of sent mail - ', info);
//         return info;
//     }
//     catch (error) {
//         console.log('Error while sending mail (mailSender) - ', email);
//     }
// }

// module.exports = mailSender;
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,             // ✅ Added port
            secure: process.env.MAIL_SECURE === "true", // ✅ Added secure option (true for 465, false for 587)
            auth: {
                user: process.env.MAIL_USER,         // ✅ Your Gmail address
                pass: process.env.MAIL_PASS          // ✅ Your App Password
            }
        });

        const info = await transporter.sendMail({
            from: `"StudyNotion || by Shanmugapriya" <${process.env.MAIL_USER}>`, // ✅ Proper "from"
            to: email,
            subject: title,
            html: body
        });

        console.log('✅ Mail sent successfully to:', email);
        return info;
    }
    catch (error) {
        console.error('❌ Error while sending mail (mailSender) - ', email, error.message); // ✅ Show error details
    }
}

module.exports = mailSender;
