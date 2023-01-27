const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
/* const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail'); 

const crypto = require('crypto');
const cloudinary = require('cloudinary'); */

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  /*  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })  */

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatar/avatar9_hyusah",
      url: "https://res.cloudinary.com/dwutk1ovx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1674852834/avatar/avatar9_hyusah.png",
      /*    public_id: result.public_id,
            url: result.secure_url  */
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
  /* sendToken(user, 200, res); */
});
