const reviewRepository = require('../repositories/review.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getByGameId = async (req, res) => {
    try {
        const reviews = await reviewRepository.getByGameId(req.params.gameId);
        if (!reviews) {
            return baseResponse(res, false, 404, "No reviews found", null);
        }
        return baseResponse(res, true, 200, "Success", reviews);
    } catch (error) {
        return baseResponse(res, false, 500, "An error occurred while getting reviews", error);
    }
}

exports.getByUserId = async (req, res) => {
    try {
        const reviews = await reviewRepository.getByUserId(req.params.userId);
        if (!reviews) {
            return baseResponse(res, false, 404, "No reviews found", null);
        }
        return baseResponse(res, true, 200, "Success", reviews);
    } catch (error) {
        return baseResponse(res, false, 500, "An error occurred while getting reviews", error);
    }
}

exports.createReview = async (req, res) => {
    try {
        console.log(req.body)
        const review = await reviewRepository.createReview(req.body);
        if (!review) {
            return baseResponse(res, false, 400, "Failed to create review", null);
        }
        return baseResponse(res, true, 201, "Review created", review);
    } catch (error) {
        return baseResponse(res, false, 500, "An error occurred while creating review", error);
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const review = await reviewRepository.deleteReview(req.params.id);
        if (!review) {
            return baseResponse(res, false, 404, "Review not found", null);
        }
        return baseResponse(res, true, 200, "Review deleted", review);
    } catch (error) {
        return baseResponse(res, false, 500, "An error occurred while deleting review", error);
    }
}