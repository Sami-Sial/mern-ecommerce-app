const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrorHandler = require("../utils/AsyncErrorHandler");
const sendToken = require("../utils/JwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const Product = require("../models/product.model.js");
const Cloudinary = require("cloudinary").v2;

// Register a User
module.exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  let url = req.file.path;
  let filename = req.file.filename;

  let newUser = new User({
    name,
    email,
    password,
    role: "admin",
    avatar: {
      public_id: filename,
      url: url,
    },
  });
  const savedUser = await newUser.save();

  sendToken(savedUser, 201, res);
});

// Login User
module.exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(400, "Email & Password is Required"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  const isPasswordMatched = await user.comparePassowrd(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  sendToken(user, 200, res);
});

// Google login
module.exports.googleLogin = AsyncErrorHandler(async (req, res, next) => {
  console.log(req.body);

  const isAlreadyExist = await User.findOne({
    email: req.body.email,
    provider: "google",
  });

  if (isAlreadyExist) {
    sendToken(isAlreadyExist, 200, res);
  } else {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      avatar: { public_id: req.body.picture, url: req.body.picture },
      provider: "google",
    });

    const savedUser = await user.save();
    console.log("saved user...", savedUser);

    sendToken(savedUser, 200, res);
  }
});

// Logout User
module.exports.logoutUser = AsyncErrorHandler((req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

// Forgot Password
module.exports.forgotPassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User Not Found"));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce App Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(500, error.message));
  }
});

// Reset Password
module.exports.resetPassword = AsyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler(400, "Toekn is invalid or has Expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not Match"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
module.exports.getUserDetails = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
module.exports.updatePassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassowrd(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Old password is incorrect"));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not match"));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = AsyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (!req.file) {
    const savedUser = await User.findById(req.user._id);
    newUserData.avatar = savedUser.avatar;

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }

  if (req.file) {
    const savedUser = await User.findById(req.user._id);
    const imageId = savedUser.avatar.public_id;

    await Cloudinary.uploader.destroy(imageId);
    newUserData.avatar = { public_id: req.file.filename, url: req.file.path };

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
});

// Get all Users => admin
module.exports.getAllUser = AsyncErrorHandler(async (req, res, next) => {
  const { currentPage } = req.query;

  if (currentPage == "undefined") {
    let users = await User.find();
    res.status(200).json({ success: true, users });
    return;
  }

  const resultPerPage = 7;
  const skip = resultPerPage * (currentPage - 1);

  const totalUsers = await User.countDocuments();
  const totalUsersPages = Math.ceil(totalUsers / resultPerPage);
  console.log(currentPage);
  console.log(skip);

  let users = await User.find().skip(skip).limit(resultPerPage);

  res.status(200).json({
    success: true,
    users,
    totalUsersPages,
  });
});

// Get single user => admin
module.exports.getSingleUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(400, `User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role => Admin
module.exports.updateUserRole = AsyncErrorHandler(async (req, res, next) => {
  let role = req.body.role === "admin" ? "user" : "admin";

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  console.log(user);

  res.status(200).json({
    success: true,
  });
});

// Delete User => Admin
module.exports.deleteUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(400, `User does not exist with Id: ${req.params.id}`)
    );
  }

  await User.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
