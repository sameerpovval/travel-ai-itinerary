const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    generateBudget,
} = require("../controllers/budgetController");

router.post(
    "/",
    protect,
    generateBudget
);

module.exports = router;