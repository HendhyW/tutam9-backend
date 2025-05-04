const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

router.post('/create', reviewController.createReview);
router.get('/bygame/:gameId', reviewController.getByGameId);
router.get('/byuser/:userId', reviewController.getByUserId);
router.delete('/delete/:id', reviewController.deleteReview);


module.exports = router;