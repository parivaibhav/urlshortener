const Url = require('../models/Url');
const User = require('../models/User');
const { nanoid } = require('nanoid');

exports.shortenUrl = async (req, res) => {
    const { originalUrl, customAlias } = req.body;

    try {
        if (customAlias) {
            const exists = await Url.findOne({ shortId: customAlias });
            if (exists) return res.status(400).json({ error: 'Custom alias already in use' });
        }



        const shortId = customAlias || nanoid(8);
        const newUrl = new Url({ originalUrl, shortId });
        await newUrl.save();

        res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
    } catch {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const { shortId } = req.params;
        console.log("🔍 Redirect request received for shortId:", shortId);

        const url = await Url.findOne({ shortId });

        if (!url) {
            console.log("❌ No matching URL in DB for:", shortId);
            return res.status(404).send('URL not found');
        }

        console.log("✅ Found URL:", url.originalUrl);
        url.clicks++;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        console.error("❌ Redirect error:", err);
        res.status(500).send('Redirect error');
    }
};


exports.getAnalytics = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch {
        res.status(500).json({ error: 'Analytics error' });
    }
};


exports.getTotalCount = async (req, res) => {
    try {
        const total = await Url.countDocuments();
        res.json({ total });
    } catch {
        res.status(500).json({ error: 'Count error' });
    }
};
