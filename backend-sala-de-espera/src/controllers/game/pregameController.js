const { Game, Player} = require('../../models'); 
const { findUser } = require('../../sockets');
const { v4: uuidv4 } = require('uuid'); 

const createGame = async (ctx) => {
    const { gameTitle } = ctx.request.body;
  try {

    const gameId = uuidv4(); 
    const game = await Game.create({ title: gameTitle, identifier: gameId }); 

    ctx.status = 201;
    ctx.body = { message: 'Juego creado exitosamente', gameId: game.title };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'Error creando el juego', error: error.message };
  }
};

const joinGame = async (ctx) => {
  const { identifier, playerId } = ctx.request.body;

  try {
    const game = await Game.findOne({ where: { identifier } });
    const player = await Player.findByPk(playerId);

    if (!game || !player) {
      ctx.status = 404; 
      ctx.body = { message: 'Juego o Jugador no encontrado' };
      return;
    }

    const playersInGame = await game.getPlayers();
    if (playersInGame.length >= 4) {
      ctx.status = 400; 
      ctx.body = { message: 'El juego está lleno' };
      return;
    }

    await game.addPlayer(player); 

    const newPlayersInGame = await game.getPlayers();

    newPlayersInGame.forEach(async (player) => {
      const user = findUser(player.userId);
      if (user) {
        ctx.io.to(user.socketId).emit('playerJoined', { gameId: game.identifier, players: newPlayersInGame})
      }
    });

    ctx.status = 200; 
    ctx.body = { message: 'El jugador se ha unido al juego' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error, el jugador no se ha unido al juego', error: error.message };
  }
};

const getPregamePlayers = async (ctx) => {
  const { identifier } = ctx.params;

  try {
    const game = await Game.findOne({ where: { identifier } });

    if (!game) {
      ctx.status = 404; 
      ctx.body = { message: 'Juego no encontrado' };
      return;
    }

    const players = await game.getPlayers(); 
    ctx.status = 200;
    ctx.body = { players }; 
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error buscando a los jugadores', error: error.message };
  }
};

const getAllGames = async (ctx) => {
  try {
    const games = await Game.findAll();
    ctx.status = 200; 
    ctx.body = { games }; 
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error buscando los juegos', error: error.message };
  }
};



module.exports = {
    createGame,
    joinGame,
    getPregamePlayers,
    getAllGames,
};