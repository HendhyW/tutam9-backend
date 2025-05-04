const db = require("../database/pg.database");
const baseResponse = require("../utils/baseResponse.util");

exports.getByGameId = async (gameId) => {
    try {
        const res = await db.query("SELECT * FROM reviews WHERE game_id = $1", [gameId]);
        return res.rows;
    } catch (error) {
        console.log("Error getting reviews by game ID", error);
    }
}

exports.getByUserId = async (userId) => {
    try {
        const res = await db.query("SELECT * FROM reviews WHERE user_id = $1", [userId]);
        return res.rows;
    } catch (error) {
        console.log("Error getting reviews by user ID", error);
    }
}

exports.createReview = async (review) => {
    try {
        console.log(review)
        const res = await db.query(
            "INSERT INTO reviews (game_id, user_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *",
            [review.game_id, review.user_id, review.rating, review.review_text]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error creating review", error);
        console.log("test error")
        return null;
    }
}

exports.deleteReview = async (id) => {
    try {
        const res = await db.query("DELETE FROM reviews WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    } catch (error) {
        console.log("Error deleting review", error);
    }
}
