const Router = require('koa-router');
const router = new Router();
const gameController = require('../controllers/game/pregameController.js');
const playerController = require('../controllers/player/playerController.js');

router.post('/', gameController.createGame);
router.post('/join', gameController.joinGame);
router.post('/create-player', playerController.createPlayer);
router.get('/:identifier/players', gameController.getPregamePlayers);
router.get('/', gameController.getAllGames); 

module.exports = router;