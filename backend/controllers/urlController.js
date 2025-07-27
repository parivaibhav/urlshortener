const Url = require('../models/Url');
const { nanoid } = require('nanoid');

exports.shortenUrl = async (req, res) => {
    const { originalUrl, customAlias } = req.body;

    try {
        // Check custom alias if provided
        if (customAlias) {
            const exists = await Url.findOne({ shortId: customAlias });
            if (exists) {
                return res.status(400).json({ error: "Custom alias already in use" });
            }
        }

        const shortId = customAlias || nanoid(8);
        const newUrl = new Url({ originalUrl, shortId });
        await newUrl.save();

        res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const url = await Url.findOne({ shortId });

        if (!url) return res.status(404).send("URL not found");

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).send("Error during redirect");
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ error: "Error fetching analytics" });
    }
};

exports.getTotalCount = async (req, res) => {
    try {
        const total = await Url.countDocuments();
        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ error: "Error getting total count" });
    }
};
