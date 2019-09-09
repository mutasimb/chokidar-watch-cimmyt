const getNcMeta = require("../utils/getNcMeta");
const WrfOut = require("../models/WrfOut");

module.exports = async function(path) {
  try {
    let wrfFileMeta = new WrfOut(getNcMeta(path));
    let savedData = await wrfFileMeta.save();
    console.log({ savedData });
  } catch (err) {
    throw err;
  }
};
