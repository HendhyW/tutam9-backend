const db = require("../database/pg.database");
const baseResponse = require("../utils/baseResponse.util");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

//buat di card di page game
exports.getAll = async () => {
    try {
        const res = await db.query("SELECT g.id, g.name, g.genre, g.image_url, g.description, g.release_date, COUNT(r.id) AS total_reviews, AVG(r.rating) AS average_rating FROM games g LEFT JOIN reviews r ON g.id = r.game_id GROUP BY g.id, g.name ORDER BY average_rating DESC NULLS LAST;");
        return res.rows;
    } catch (error) {
        console.log("Error getting games", error);
    }
}

//dipake di page game detail
exports.getById = async (id) => {
    try {
        const res = await db.query("SELECT g.id, g.name, g.genre, g.image_url, g.description, g.release_date, COUNT(r.id) AS total_reviews, AVG(r.rating) AS average_rating, COALESCE(ARRAY_AGG(r.id), '{}') AS review_ids FROM games g LEFT JOIN reviews r ON g.id = r.game_id WHERE g.id = $1 GROUP BY g.id, g.name", [id]);
        return res.rows[0];
    } catch (error) {
        console.log("Error getting game", error);
    }
}

exports.createGame = async (game, image) => {
    try{
        let imageB64 = null;
        if(image){
            imageB64 = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
        }
        const url = await cloudinary.uploader.upload(imageB64, {
            resource_type: "image",
            public_id: "image",
            notification_url: "http:/localhost:3000/item/create"
        }); 
        const res = await db.query(
            "INSERT INTO games (name, genre, image_url, description, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [game.name, game.genre, url.secure_url, game.description, game.release_date]
        );
        return res.rows[0];
    }catch(error){
        console.log("Error creating game", error);
    }
}