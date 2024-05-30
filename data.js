/*
  Copyright © KazuoYuuka 2024

  Dont not sell this script
*/

const { InputFile } = require('grammy');
const fs = require('fs');
const loc = fs.readFileSync("./system/database/img/oscar-face.jpg");


// config
const bot_token = ""; // bot token (can get from @GrandFather = http://t.me/)
const owner_id = [5051394886]; // owner id (can get from @X_Oscar_bot = http://t.me)
const channel_log_id = [-1001816883555];

// add manual premium user
const user_prem_manual = [5051394886];

// owner 
const owner_username = "@KazuoYuuka";
const owner_firstname = "Kazuo";
const owner_lastname = "Yuuka";
const copyright = "Copyright © 2024 KazuoYuuka";

// bot info
const bot_name = 'Oscar AI';
const bot_version = '4.2.240529-original';
const bot_language = 'English, Indonesian';
const platform = 'Kali_Linux_x64';
const bot_image = new InputFile(loc)

// server info
const server_port = 8080;

// open ai api
const openai_api = "";
const openai_api2 = "";
const openai_api3 = "";

// api.lolhuman.xyz
const api_lolhuman = 'Ichanzx'
const api_lolhuman2 = '521e37eeffa2c10fd1feb4e9'
const api_lolhuman3 = 'haikalgans'


const help_msg = `
┌────◉ About Bot
▧ bot_name: <code>${bot_name}</code>
▧ bot_version: <code>${bot_version}</code>
▧ bot_language: <code>${bot_language}</code>
▧ platform: <code>${platform}</code>
▧ owner: ${owner_username}
└────◉

┌────◉ Basic Command
❏ /start - start the bot
❏ /help - show this message
❏ /owner - some information about owner
❏ /ping - ping the bot
└────◉

┌────◉ Fun
❏ /8ball - ask the magic 8-ball a question
❏ /iq - check someone's IQ
❏ /meme - get random meme
❏ /sadvibes - get some sad quotes
❏ /quote - send some quote
❏ /darkjoke - get some darkjoke
❏ /couple - send couple pfp
└────◉

┌────◉ Utility
❏ /wiki - search something on wikipedia
❏ /calendars - open and see calendars
❏ /pin - search image in pinterest
❏ /search - search something in some website
❏ /node - search javascript package in npmjs.org and yarnpkg.com
❏ /pip - search python package in pypi.org
└────◉

┌────◉ Owner Command
❏ /sepi - sepi
└────◉

┌────◉ Bot Feature
❏ owner and premium features
❏ check badword message
❏ <b>have secret command</b>
└────◉

┌────◉
▧ Script by KazuoYuuka
▧ ${copyright}
└────◉`;

const help_kazuo_pro = `
┌────◉ About Bot
▧ bot_name : <code>${bot_name}</code>
▧ bot_version : <code>${bot_version}</code>
▧ bot_language : <code>${bot_language}</code>
▧ platform : <code>${platform}</code>
▧ owner : ${owner_username}
└────◉

┌────◉ Basic Menu
❏ /start - start the bot
❏ /help - show this message
❏ /owner - some information about owner
❏ /ping - ping the bot
└────◉

┌────◉ Fun Menu
❏ /8ball - ask the magic 8-ball a question
❏ /iq - check someone's IQ
❏ /meme - get random meme
❏ /sadvibes - get some sad quotes
❏ /quote - send some quote
❏ /darkjoke - get some darkjoke
❏ /couple - send couple pfp
└────◉

┌────◉ Utility Menu
❏ /sfw - send random sfw image
❏ /wiki - search something on wikipedia
❏ /calendars - open and see calendars
❏ /pin - search image in pinterest
❏ /search - search something in some website
❏ /node - search javascript package in npmjs.org and yarnpkg.com
❏ /pip - search python package in pypi.org
└────◉

┌────◉ Owner Menu
❏ /sepi - send sepi virus
❏ /nsfw - send random nsfw image
└────◉

┌────◉ Cecan Menu
❏ /cecann - send custom cecan image
❏ /cecanj - send japanese cecan image
❏ /cecani - send indonesian cecan image
❏ /cecanc - send chinese cecan image
❏ /cecank - send korean cecan image
❏ /cecanm - send malaysian cecan image
❏ /cecanv - send vietnam cecan image
└────◉

┌────◉ Bot Feature
❏ owner and premium features
❏ check badword message
❏ <b>have secret command</b>
└────◉

┌────◉
▧ Script by KazuoYuuka
▧ ${copyright}
└────◉`;


module.exports = {
  bot_token,
  owner_id,
  channel_log_id,
  user_prem_manual,
  owner_username,
  owner_firstname,
  owner_lastname,
  copyright,
  bot_name,
  bot_version,
  bot_language,
  platform,
  bot_image,
  server_port,
  openai_api,
  openai_api2,
  openai_api3,
  help_msg,
  help_kazuo_pro,
  api_lolhuman,
  api_lolhuman2,
  api_lolhuman3
};

