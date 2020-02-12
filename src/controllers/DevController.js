const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");
// index, store, show, update, delete
module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    const DevRes = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      let { name = login, avatar_url, bio } = DevRes.data;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }
    return res.json(dev);
  },
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  }
};
