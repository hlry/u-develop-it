const express = require('express');
const router = express.Router();

// candidate routes
router.use(require('./candidateRoutes'));

// party routes
router.use(require('./partyRoutes'));

// voter routes
router.use(require('./voterRoutes'));

module.exports = router;