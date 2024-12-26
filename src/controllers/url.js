const Url = require("../models/url");
const shortid = require("shortid");

async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "URL is required" });
  }
  const shortId = shortid(6);
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await Url.findOne({ shortId: shortId });
  if (!entry) {
    return res.status(404).json({ message: "URL not found" });
  }
  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}

module.exports = {
  generateNewShortURL,
  getAnalytics,
};
