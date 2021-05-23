const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const userCtrl = require('../controllers/user');

const checkSignup = require('../middleware/checkSignup');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // bloqué après 5 requête
  message:
    "Trop de comptes créés à partir de cette IP, veuillez réessayer après une heure",
});

router.post("/signup", checkSignup, createAccountLimiter, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;