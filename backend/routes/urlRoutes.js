const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const {
    shortenUrl,
    redirectUrl,
    getAnalytics,
    getTotalCount,
} = require('../controllers/urlController');

router.post('/shorten', auth, shortenUrl);
router.get('/analytics', getAnalytics);
router.get('/count', getTotalCount);
router.get('/:shortId', redirectUrl);

module.exports = router;