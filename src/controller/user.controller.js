const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../service');
const { success } = require('../utils/AppUtils');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(success(user, 'User Successfully Created'));
});

const userLogin = catchAsync(async (req, res) => {
  const token = await userService.userLogin(req.body);
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Email or Password');
  }
  res.status(httpStatus.CREATED).send(success(token, 'Logged In!'));
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(success(user, 'Succesfully Retrived User'));
});

const getUserDevicesByUserId = catchAsync(async (req, res) => {
  console.log(req.user);
  const devices = await userService.getUserDevicesByUserId(req.user.id);
  if (!devices) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  res.send(success(devices, 'Succesfully Retrived User Devices'));
});

const getUserByName = catchAsync(async (req, res) => {
  const user = await userService.getUserByName(req.params.name);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(success(user, 'Succesfully Retrived User'));
});

const getUserByEmail = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(success(user, 'Succesfully Retrived User'));
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.send(success(user, 'User Updated Successfully'));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.send(success(req.params.userId, 'User Deleted Successfully'));
});

module.exports = {
  createUser,
  userLogin,
  getUserById,
  getUserDevicesByUserId,
  getUserByName,
  getUserByEmail,
  updateUserById,
  deleteUser,
};
