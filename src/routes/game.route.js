const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const gameController = require('../controllers/game.controller')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', gameController.getAll);
router.post('/create', upload.single('image'), gameController.createGame);
router.get('/:id', gameController.getById);

module.exports = router;