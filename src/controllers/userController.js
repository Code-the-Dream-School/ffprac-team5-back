const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(` No User with id ${UserId}`);
  }
  console.log(user);
  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  const {
    body: { name, email },
    params: { id: userId },
  } = req;
  if (!name || !email) {
    throw new BadRequestError("Name / Email cannot be empty");
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: req.body.name,
        email: req.body.email,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError(` No user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError(` No user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
