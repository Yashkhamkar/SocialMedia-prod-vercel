const generateOtp = async () => {
  const otp = Math.floor(Math.random() * 9000) + 1000;
  otp.toString();
  return otp;
};
module.exports = generateOtp;
