const express = require('express');
const router = express.Router();
const {
    handleCreateShortURL, 
    handleGetRedirectURL,
    handleGetAnalytics
} = require('../controllers/url');

router.post('/', handleCreateShortURL);
router.get('/:id', handleGetRedirectURL);

router.get('/analytics/:id', handleGetAnalytics);

module.exports = router;