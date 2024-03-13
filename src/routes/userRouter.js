const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/authentication");

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/:id").get(auth, getUser);
router.route("/:id").post(auth, createUser);
router.route("/:id").delete(auth, deleteUser).post(auth, updateUser);

module.exports = router;
