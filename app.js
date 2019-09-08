const fs = require("fs");
const util = require("util");
const express = require("express");
const chokidar = require("chokidar");
const mongoose = require("mongoose");

const { mongoUri } = require("./config/keys");
const WrfOut = require("./models/WrfOut");
const getNcMeta = require("./utils/getNcMeta");

const readdir = util.promisify(fs.readdir);

const app = express();

const watcher = chokidar.watch(process.env.PATH_WRF_DIR + "*.nc", {
  ignored: /(^|[\/\\])\../,
  awaitWriteFinish: {
    stabilityThreshold: 30000
  }
});

const startServer = async function() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true });

    let wrfFiles = await readdir(process.env.PATH_WRF_DIR);
    wrfFiles = wrfFiles.filter(
      el => el.startsWith("wrf_out_") && el.endsWith(".nc")
    );

    let wrfData = await WrfOut.find(),
      wrfDataDb = wrfData.map(el => el.name),
      wrfFilesToBeProcessed = wrfFiles
        .filter(el => wrfDataDb.indexOf(el) == -1)
        .map(el => "/home/mutasim/wrf_out/" + el)
        .map(getNcMeta);

    if (wrfFilesToBeProcessed.length) {
      let insertedFiles = await WrfOut.insertMany(wrfFilesToBeProcessed);
      console.log({ insertedFiles });
    }

    watcher.on("add", path => {
      console.log({ path, time: new Date() });
    });

    app.listen(9000, () => {
      console.log("Server started running at port 9000");
    });
  } catch (err) {
    throw err;
  }
};

startServer();
