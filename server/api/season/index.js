var express = require('express');

var router = express.Router();

router.get('/',         auth.isAuthenticated, controller.index);
router.get('/:id',      auth.isAuthenticated, controller.show);
router.post('/',        auth.isAuthenticated, controller.create);
//router.put('/:id',      auth.isAuthenticated, controller.update);
//router.patch('/:id',    auth.isAuthenticated, controller.active);
router.delete('/:id',   auth.isAuthenticated, controller.destroy);

module.exports = router;
