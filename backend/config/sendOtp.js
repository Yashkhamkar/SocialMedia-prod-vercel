const nodemailer = require("nodemailer");
const SendOtp = async (email, otp, sub) => {
  console.log(otp);
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
      secure: true,
    });
    const mailData = {
      to: email,
      subject: `You have recived Otp from YKONNECT`,
      text: `${otp} is your YKONNECT OTP. Please do not share the OTP with others.
        Regards,
        Team YKONNECT`,
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { SendOtp };
