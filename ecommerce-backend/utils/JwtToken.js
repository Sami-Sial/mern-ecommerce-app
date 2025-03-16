// Creating Token & Saving in Cookie

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJwtToken();

  //   const cookieOptions = {
  //     expires: new Date(Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 1000),
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "none",
  //   };

  //   res.status(statusCode).cookie("token", token, cookieOptions).json({
  //     success: true,
  //     user,
  //     token,
  //   });

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
