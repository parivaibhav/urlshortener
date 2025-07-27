const express = require('express');
const router = express.Router();
const {
    shortenUrl,
    redirectUrl,
    getAnalytics,
    getTotalCount
} = require('../controllers/urlController');

router.post('/shorten', shortenUrl);
router.get('/analytics', getAnalytics);
router.get('/count', getTotalCount); // ✅ New route
router.get('/:shortId', redirectUrl);


module.exports = router;
