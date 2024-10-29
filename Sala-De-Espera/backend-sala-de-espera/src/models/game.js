'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // Asociación con el modelo Player
      this.belongsToMany(models.Player, {
        through: 'GamePlayers', // Nombre de la tabla intermedia
        foreignKey: 'gameId',
        otherKey: 'playerId',
      });
    }
  }

  Game.init({
    title: DataTypes.STRING,
    identifier: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Game',
  });
  
  return Game;
};
