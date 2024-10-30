const { User, Player} = require('../../models'); 

const createPlayer = async (ctx) => {

    const { user_id } = ctx.request.body;
    
    try {
        console.log(user_id);
        const user = await ctx.orm.User.findByPk(user_id);

        if (!user) {
            ctx.status = 404; 
            ctx.body = { message: 'Usuario no encontrado' };
            return;
        }

        const player = await Player.create({ name: user.username, score: 0, userId: user_id });

        ctx.status = 201; 
        ctx.body = { message: 'Jugador creado exitosamente!', id: player.id };
    } catch (error) {
        ctx.status = 500; 
        ctx.body = { message: 'Error creando al jugador', error: error.message };
    }
};

module.exports = { createPlayer };