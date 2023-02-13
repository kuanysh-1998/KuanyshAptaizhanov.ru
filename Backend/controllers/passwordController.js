const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/User");

const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sentEmail = require("../utils/sendEmail");
const sendEmail = require("../utils/sendEmail");

/**-------------------------------------------------------------
* @desc Send Reset password link
* @route /api/password/reset-password-link
* @method POST
* @access public
------------------------------------------------------------- */

module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Пользователь с такой почтой не существует!" });
  }

  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await verificationToken.save();
  }

  const link = `${process.env.CLIENT_DOMAIN}/#/reset-password/${user._id}/${verificationToken.token}`;
  const htmlTemplate = `<a href="${link}">Нажмите здесь чтобы восстановить пароль!</a>`;
  await sendEmail(user.email, "Восстановить пароль!", htmlTemplate);
  res.status(200).json({
    message:
      "Ссылка для восстановления пароля, отправлена на вашу почту, проверьте пожалуйста!",
  });
});

/**-------------------------------------------------------------
* @desc Get Reset password link
* @route /api/password/reset-password/:userId/:token
* @method GET
* @access public
------------------------------------------------------------- */

module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "недопустимая ссылка" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Недопустимая ссылка" });
  }

  res.status(200).json({ message: "Допустимый URL-адрес" });
});

/**-------------------------------------------------------------
* @desc Reset password 
* @route /api/password/reset-password/:userId/:token
* @method GET
* @access public
------------------------------------------------------------- */

module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
  const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "Недопустимая ссылка" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Недопустимая ссылка" });
  }

  if (!user.isAccountVerified) {
    user.isAccountVerified = true;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();
  await verificationToken.remove();

  res
    .status(200)
    .json({ message: "Пароль сброшен успешно, пожалуйста, войдите!" });
});
