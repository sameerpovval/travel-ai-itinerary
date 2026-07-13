const User = require("../models/User");
const bcrypt = require("bcryptjs");


const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const { name } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = name || user.name;

        await user.save();

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const uploadProfilePhoto = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image",
            });
        }

        user.profileImage = req.file.path.replace(/\\/g, "/");

        await user.save();

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword,
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }

        user.password = await bcrypt.hash(
            newPassword,
            10
        );

        await user.save();

        res.status(200).json({
            message: "Password changed successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfilePhoto,
    changePassword,
};