var express = 		require('express');
var controller = 	require('./tile.controller');
var router = 		express.Router();

router.get('/', 		controller.index);
router.get('/:id', 		controller.show);
router.get('/getRandom/:nbPlayer', controller.indexRandom);

module.exports = router;
