const gameRepository = require('../repositories/game.repository');
const baseResponse = require('../utils/baseResponse.util');


exports.getAll = async (req, res) => {
    try{
        const game = await gameRepository.getAll();
        if(!game){
            return baseResponse(res, false, 404, "No games found", null);
        }
        return baseResponse(res, true, 200, "Success", game);
    } catch{
        return baseResponse(res, false, 500, "An error occurred while getting games", error);
    }
}

exports.getById = async (req, res) => {
    try{
        const game = await gameRepository.getById(req.params.id);
        if(!game){
            return baseResponse(res, false, 404, "Game not found", null);
        }
        return baseResponse(res, true, 200, "Success", game);
    } catch{
        return baseResponse(res, false, 500, "An error occurred while getting game", error);
    }
}

exports.createGame = async (req, res) => {
    try{
        const game = await gameRepository.createGame(req.body, req.file);
        if(!game){
            return baseResponse(res, false, 400, "Failed to create game", null);
        }
        return baseResponse(res, true, 201, "Game created", game);
    }catch{
        return baseResponse(res, false, 500, "An error occurred while creating game", error);
    }
}
