const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require("../controllers/UserController");
const authMiddleware = require("../middleware/Jwt");

router.get("/", authMiddleware, getUsers);  
router.post("/", createUser);  
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.post("/login", loginUser);  

module.exports = router;
