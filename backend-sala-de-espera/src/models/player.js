'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      // Cada jugador pertenece a un usuario
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      // Un jugador puede participar en muchos juegos a través de 'GamePlayers'
      this.belongsToMany(models.Game, {
        through: 'GamePlayers',
        foreignKey: 'playerId',
        otherKey: 'gameId',
        as: 'games', // Alias para la relación
      });
    }
  }

  Player.init({
    name: DataTypes.STRING,
    score: DataTypes.INTEGER,
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, // El jugador siempre debe tener un usuario asociado
      references: {
        model: 'Users', // Nombre de la tabla referenciada
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Player',
  });

  return Player;
};
