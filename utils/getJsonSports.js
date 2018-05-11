const fs = require('fs');
const path = require('path');
const dateFormat = require('dateformat');
const getCoordinateData = require('./getCoordinateData');

const CONFIG_DATA = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/config.json')));
const JSON_SPORTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/jsonSports.json')));

function getJsonSports() {
  let endTimeStamp = +new Date();
  let startTimeStamp = endTimeStamp - CONFIG_DATA.SPORT_TIME * 1000 - parseInt(1000 * (15 * Math.random() + 5));
  let endTime = dateFormat(endTimeStamp, 'yyyy-mm-dd hh:MM:ss');
  let currentDate = dateFormat(startTimeStamp, 'yyyy-mm-dd hh:MM:ss');
  let interval = endTimeStamp - startTimeStamp;
  let sportId = +new Date() - interval;
  let sportDistance = (CONFIG_DATA.SPORT_DISTANCE + Math.random()).toFixed(2);
  let avgSpeed = (sportDistance * 3600000 / interval).toFixed(1);
  let coordinate = getCoordinateData(parseInt(startTimeStamp / 1000), parseInt(endTimeStamp / 1000));
  
  JSON_SPORTS.xh = CONFIG_DATA.XH;
  JSON_SPORTS.sportId = sportId;
  JSON_SPORTS.currentDate = currentDate;
  JSON_SPORTS.beginTime = currentDate;
  JSON_SPORTS.endTime = endTime;
  JSON_SPORTS.name = CONFIG_DATA.NAME;
  return JSON_SPORTS;
}

console.log(getJsonSports());
module.exports = getJsonSports;