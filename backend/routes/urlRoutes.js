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
router.get('/:shortId', redirectUrl);
router.get('/count', getTotalCount); // ✅ New route


module.exports = router;
