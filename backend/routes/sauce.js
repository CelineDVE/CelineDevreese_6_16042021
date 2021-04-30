const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require("../middleware/multer-config");
const checkFormCreate = require('../middleware/checkFormCreate');


router.post("/", auth, multer,  sauceCtrl.createSauce); /* ajout d'un élément */
router.put("/:id", auth, multer,  sauceCtrl.modifySauce); /* modification d'un élément */
router.delete("/:id", auth, sauceCtrl.deleteSauce); /* supprimer un élément */
router.get("/:id", auth, sauceCtrl.getOneSauce); /* Retourne un seul élément par son ID */
router.get('/', auth, sauceCtrl.getAllSauces); /* Retourne toutes les éléments */
router.post('/:id/like', auth, sauceCtrl.sauceLike);

module.exports = router;