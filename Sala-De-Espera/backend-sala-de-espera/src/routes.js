const Router = require('koa-router');
const users = require('./routes/users.js');
const authRoutes = require('./routes/authentication.js')
const gameRoutes = require('./routes/games.js')
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt')

dotenv.config();

const router = new Router();

router.use(authRoutes.routes());


// Desde esta línea, todas las rutas requieriran un JWT. Esto no aplica para
// las líneas anteriores
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } ))

router.use('/users', users.routes());
router.use('/games', gameRoutes.routes());


module.exports = router;
