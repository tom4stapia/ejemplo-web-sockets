'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GamePlayers', {
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games', // nombre de la tabla Games
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players', // nombre de la tabla Players
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GamePlayers');
  },
};
