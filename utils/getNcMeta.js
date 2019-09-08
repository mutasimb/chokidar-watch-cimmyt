const fs = require("fs");

const getNcMeta = ncFullPath => {
  const pathSplit = ncFullPath.split("/"),
    nc = pathSplit.pop(),
    ncDir = pathSplit.join("/"),
    statNc = fs.statSync(ncDir + "/" + nc),
    datetimeStr = nc.replace("wrf_out_", "").replace(".nc", "");

  return {
    name: nc,
    fullPath: ncDir + "/" + nc,
    forecastDate: {
      y: +datetimeStr.substr(0, 4),
      m: +datetimeStr.substr(4, 2),
      d: +datetimeStr.substr(6, 2)
    },
    fileSize: statNc.size,
    modifiedTime: statNc.mtime.toISOString()
  };
};

module.exports = getNcMeta;
