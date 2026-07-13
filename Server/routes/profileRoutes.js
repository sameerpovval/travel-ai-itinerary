const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    uploadProfilePhoto,
    changePassword,
} = require("../controllers/profileController");

router.get(
    "/",
    authMiddleware,
    getProfile
);

router.patch(
    "/",
    authMiddleware,
    updateProfile
);

router.patch(
    "/photo",
    authMiddleware,
    upload.single("photo"),
    uploadProfilePhoto
);

router.patch(
    "/password",
    authMiddleware,
    changePassword
);

module.exports = router;