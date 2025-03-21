const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require("../controllers/UserController");

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login",loginUser)

module.exports = router;
