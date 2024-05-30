/*
  Copyright © KazuoYuuka 2024

  Dont not sell this script
*/

const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy');
const Calendar = require('telegram-inline-calendar');
const axios = require('axios');
const fs = require('fs');
const { Quotes, Darkjokes, Couples } = require('dhn-api');
const wiki = require('wikipedia');
const { cortanet } = require('./system/database/virus/cortanet');

const { getRandom, fetchJson, pinterest, escapeHtml, hen1 } = require('./system/lib/lib');
const {
    bot_token,
    bot_name,
    bot_version,
    bot_language,
    platform,
    owner_firstname,
    owner_lastname,
    owner_username,
    owner_id,
    channel_log_id,
    user_prem_manual,
    copyright,
    help_msg,
    help_kazuo_pro,
    bot_image
} = require('./data');
const { app } = require('./server');

const badword = require('./system/api/badword');
const ball8 = require('./system/api/ball8');
const sadword = require('./system/api/sadword');

const owner_link = `t.me/${owner_username}`;
const not_owner = `yoo're not a owner`;
const not_premium = `yoo're not a premium user`;
const not_owner_premium = `yoo're not a owner or premium user`;
const kazuo_null = `404..\n\nCommand not found`;
const waiting_server = 'Waiting server....';
const no_args = 'Error...  Need Argument\n\nExample: ';
const res404 = "404...\n\nCan't Connect to the Server";
const kazuo_cmd = 'Only owner can use command...';
const err_img = 'Error While send image...';
const err_unknown = 'Error Unknown';
const err_channel = 'only used in channel'


const kazuo = new Bot(bot_token);
module.exports = kazuo;


kazuo.catch((err) => {
    const err2 = err.ctx;
    console.error(`Error while handling update ${err2.update.update_id}`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error(`Error in request:\n${e.description}`);
        kazuo.api.sendMessage(channel_log_id, err);
    } else if (e instanceof HttpError) {
        console.error(`Could not contact telegram:\n${e}`);
        kazuo.api.sendMessage(channel_log_id, err);
    } else {
        console.error(`Unknown error:\n${e}`);
        kazuo.api.sendMessage(channel_log_id, err);
    };
    kazuo.api.sendMessage(channel_log_id, err);
});

// app.run()
kazuo.start();



const calendar = new Calendar(kazuo, {
    date_format: 'DD-MM-YYYY',
    language: 'en',
    bot_api: 'grammy'
});

kazuo.use(async (msg, next) => {
    msg.config = {
        botDeveloper: owner_id,
        isDeveloper: msg.from?.id === owner_id,
        isPremium: msg.from?.id === user_prem_manual
    };
    await next();
});

kazuo.api.setMyCommands([
    { command: "start", description: "start the bot" },
    { command: 'help', description: 'show help message' },
    { command: 'owner', description: 'some information about the owner bot' }
]).then(() => {
    console.log('Bot is Ready');
}).catch((err) => {
    console.log(err);
});

kazuo.on(('msg:photo') || ('msg:document') || ('msg:video') || ('msg:file'), async (msg) => {
    kazuo.api.sendDocument(channel_log_id, msg).catch(err => msg.api.sendMessage(channel_log_id, err) && console.log(err));
});

kazuo.on("callback_query:data", async (msg) => {
    if (msg.msg.message_id === calendar.chats.get(msg.chat.id)) {
        const res = calendar.clickButtonCalendar(msg.callbackQuery);
        if (res !== -1) {
            await msg.reply(`You selected: ${res}`);
        };
    };

    if (msg.callbackQuery.data === 'login') {
        if (msg.config.isDeveloper) {
            await msg.reply('Login As Owner', {
                reply_parameters: {
                    message_id: msg.msg.message_id
                }
            });
            await msg.answerCallbackQuery('Welcome Back Owner...');
        } else if (msg.config.isPremium) {
            await msg.reply('Login As Premium', {
                reply_parameters: {
                    message_id: msg.msg.message_id
                }
            });
            await msg.answerCallbackQuery('Hello Premium User...');
        } else {
            await msg.reply('Login As User', {
                reply_parameters: {
                    message_id: msg.msg.message_id
                }
            });
            await msg.answerCallbackQuery('Hello User...');
        };
    };
});



kazuo.hears(badword, async (msg) => {
    const g = msg.msg.text.replace(msg).toLowerCase();
    try {
        kazuo.api.sendMessage(channel_log_id, `Someone say ${g}`);
    } catch (err) {
        msg.reply(`Log:\n\n${err}`)
    }
});


kazuo.command('start', async (msg) => {
    const a = msg.getAuthor();
    const welcomeMsg = `I'am a basic bot create by KazuoYuuka for fun only`
    const helpMsg = 'Stuck?... Dont know what are you doing next?...\n\ntry /help'
    const inline = new InlineKeyboard()
        .text('Login', 'login')
    await msg.replyWithPhoto(bot_image, {
        caption: `Welcome...\n${welcomeMsg}\n\nName: <code>${(await a).user.first_name || ''} ${(await a).user.last_name || ''}</code>\nUserName: <code>@${(await a).user.username || ''}</code>\nUserID: <code>${(await a).user.id}</code>\n\n\n${helpMsg}`,
        reply_markup: inline,
        parse_mode: 'HTML',
        reply_parameters: {
            message_id: msg.msg.message_id
        }
    })
});

kazuo.command('owner', async (msg) => {
    const o = `
┌────◉ Owner Bot
▧ Name : <code>${owner_firstname || ''} ${owner_lastname || ''}</code>
▧ UserName : <code>${owner_username || ''}</code>
▧ UserID : <code>${owner_id}</code>
└────◉`;
    const inline = new InlineKeyboard().url('Chat Owner', owner_link)
    msg.reply(o, {
        reply_parameters: {
            message_id: msg.msg.message_id
        },
        parse_mode: 'HTML',
        reply_markup: inline
    });
});

kazuo.command('help', async (msg) => {
    const inline = new InlineKeyboard().url('Chat Owner', owner_link)
    msg.reply(help_msg, {
        parse_mode: 'HTML',
        reply_markup: inline
    });
});

kazuo.command('kazuo_pro', async (msg) => {
    msg.reply(help_kazuo_pro, {
        reply_parameters: {
            message_id: msg.msg.message_id
        },
        parse_mode: 'HTML'
    });
});

kazuo.command('ping', async (msg) => {
    await msg.reply(`Pong...`);
});

kazuo.command('sadvibes', async (msg) => {
    const resp = sadword[Math.floor(Math.random() * sadword.length)];
    await msg.reply(resp);
});

kazuo.command('8ball', async (msg) => {
    if (!msg.message.text.includes(' ')) {
        await msg.reply('Ask a question...');
        return;
    } else {
        const resp = ball8[Math.floor(Math.random() * ball8.length)];
        await msg.reply(resp);
    }
});

kazuo.command('calendars', async (msg) => {
    calendar.startNavCalendar(msg.msg);
});

kazuo.command('iq', async (msg) => {
    let iqData = {};
    let iqDataFile = __dirname + '/system/database/user/iq_data.json';
    try {
        if (!fs.existsSync(iqDataFile)) {
            fs.writeFileSync(iqDataFile, '{}', 'utf-8');
        };
        const iqDataFileContents = fs.readFileSync(iqDataFile, 'utf-8');
        iqData = JSON.parse(iqDataFileContents);
    } catch (error) {
        console.error('Error loading IQ data:', error);
    };
    let username = msg.message.text.substring(msg.message.text.indexOf(' ') + 1);
    if (username.includes('/iq' || username.includes(`/iq@${msg.botInfo.username}`))) {
        username = msg.message.from.id.toString();
    };
    let iq = iqData[username];
    if (iq === undefined) {
        iq = Math.floor(Math.random() * 301) - 100;
        iqData[username] = iq;
        fs.writeFileSync(iqDataFile, JSON.stringify(iqData), 'utf-8');
    };
    let response = '';
    if (!msg.message.text.includes(' ')) {
        response = `<b>Your (${msg.message.from.first_name})</b> IQ is ${iq}`;
    } else {
        const username = msg.message.text.substring(msg.message.text.indexOf(' ') + 1);
        response = `<b>${username}</b>'s IQ is ${iq}`;
    };
    if (iq < 0) {
        response += '\n\nbro got no brain frfr 💯💯';
    } else if (iq < 80) {
        response += '\n\nEh, consider getting a new brain from shopee or olx or something 👀';
    } else if (iq < 130) {
        response += "\n\nNot bad, but they're not a genius either 👎";
    } else {
        response += '\n\nHmm! Looks like we have a nerd over here 🤓';
    };
    await msg.reply(response, {
        parse_mode: 'HTML'
    });
});

// kazuo.command('sfw', async (msg) => {
//     if (!msg.msg.text.includes(' ')) {
//         msg.reply('Please Describe something\nExample: /sfw waifu');
//     } else {
//         try {
//             const ok = msg.msg.text.substring(msg.msg.text.indexOf(' ') + 1);
//             const mainUrl = await axios.get(`https://api.waifu.pics/sfw/${ok}`);
//             const { url } = mainUrl.data;
//             await msg.replyWithPhoto(url, {
//                 caption: `Generate from: https://api.waifu.pics`
//             });
//         } catch (err) {
//             msg.reply(`Log:\n${err}`);
//         };
//     };
// });

// kazuo.command('nsfw', async (msg) => {
//     if (!msg.msg.text.includes(' ')) {
//         msg.reply('Please Describe something\nExample: /nsfw waifu');
//     } else {
//         try {
//             const ok = msg.msg.text.substring(msg.msg.text.indexOf(' ') + 1);
//             const mainUrl = await axios.get(`https://waifu.pics/api/nsfw/${ok}`);
//             const { url } = mainUrl.data;
//             await msg.replyWithPhoto(url, {
//                 caption: `Generate from: https://waifu.pics`
//             });
//         } catch (err) {
//             msg.reply(err);
//             console.log(err);
//         };
//     };
// });

kazuo.command('sfw', async (msg) => {
    const l_sfw = ['waifu', '']
    const r_sfw = l_sfw[Math.floor(Math.random() * l_sfw.length)]
    const mainUrl = await axios.get(`https://api.waifu.pics/sfw/${r_sfw}`);
    const { url } = mainUrl.data;
    await msg.replyWithPhoto(url, {
        caption: `Generate from: https://waifu.pics`
    }).catch(err => msg.api.sendMessage(channel_log_id, err) && console.log(err));
});

kazuo.command('nsfw', async (msg) => {
    const l_nsfw = ['waifu', '']
    const r_nsfw = l_nsfw[Math.floor(Math.random() * l_nsfw.length)]
    const mainUrl = await axios.get(`https://waifu.pics/api/nsfw/${r_nsfw}`);
    const { url } = mainUrl.data;
    await msg.replyWithPhoto(url, {
        caption: `Generate from: https://waifu.pics`
    });
});

kazuo.command('meme', async (msg) => {
    await msg.api.sendChatAction(msg.chat.id, 'typing');
    const response = await axios.get('https://meme-api.com/gimme');
    const { title, postLink, subreddit, url } = response.data;
    const inlineKeyboard = new InlineKeyboard().url('View on Reddit', postLink);
    await msg.replyWithPhoto(url, {
        caption: `${title}\n\nPosted on r/${subreddit}`,
        reply_markup: inlineKeyboard,
    }).catch(err => msg.api.sendMessage(channel_log_id, err) && console.log(err));
});

kazuo.command('darkjoke', async (msg) => {
    const darkjoke = await Darkjokes();
    msg.replyWithPhoto(darkjoke, {
        reply_parameters: {
            message_id: msg.msg.message_id
        }
    });
});

kazuo.command('quote', async (msg) => {
    const quote = await Quotes();
    const { quotes } = quote;
    msg.reply(quotes, {
        reply_parameters: {
            message_id: msg.msg.message_id
        }
    });
});

kazuo.command('couple', async (msg) => {
    const couple = await Couples();
    const { male, female } = couple;
    msg.replyWithPhoto(male);
    msg.replyWithPhoto(female);
});

kazuo.command('wiki', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Please Describe something');
    } else {
        const query = msg.msg.text.substring(msg.msg.text.indexOf(' ') + 1);
        const page = await wiki.page(query);
        if (!page.title) {
            msg.reply('Page not found on Wikipedia.');
        };
        const pageTitle = page.title;
        const pageUrl = page.fullurl;
        const pageSummary = await page.summary();
        const pageExtract = pageSummary.extract;
        const keyboard = new InlineKeyboard().url('View on Wikipedia', pageUrl);
        await msg.reply(`<b>Wikipedia: ${pageTitle}</b>\n\n${pageExtract}`, {
            parse_mode: 'HTML',
            reply_markup: keyboard,
        });
    }
});

kazuo.command('sepi', async (msg) => {
    try {
        if (msg.config.isDeveloper) {
            msg.reply(cortanet);
        } else {
            msg.reply(not_owner);
        };
    } catch (err) {
        msg.reply(err);
    };
});

kazuo.command('bible', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Please describe something...\n\n/bible John 3:16')
    } else {
        const ok = msg.msg.text.substring(msg.msg.text.indexOf(' ') + 1);
        const response = await axios.get(`https://bible-api.com/${ok}`)
        const { text } = response.data
        msg.reply(`${ok}\n${text}`)
    }
})

kazuo.command('pin', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Please Describe something...\n\nExample: /pin anime');
    } else {
        const ok = msg.message.text.substring(msg.message.text.indexOf(' ') + 1);
        const anu = await pinterest(ok);
        const result = anu[Math.floor(Math.random() * anu.length)];
        const result2 = anu[Math.floor(Math.random() * anu.length)];
        msg.replyWithPhoto(result2);
        msg.replyWithPhoto(result);
    };
});

kazuo.command('search', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Example: /search who is albert einstain');
    } else {
        const query = escapeHtml(msg.msg.text.substring(msg.msg.text.indexOf(' ') + 1));
        const args1 = msg.msg.text.substring(msg.msg.text.indexOf(' ') + 1)
        const keyboard = new InlineKeyboard()
            .url('Google', `https://google.com/search?q=${query}`)
            .url('Bing', `https://www.bing.com/search?q=${query}`)
            .url('Yahoo', `https://search.yahoo.com/search?p=${query}`)
            .row()
            .url('DuckDuckGo', `https://duckduckgo.com/?q=${query}`)
            .url('Startpage', `https://www.startpage.com/do/dsearch?query=${query}`)
            .row()
            .url('searXNG', `https://searx.work/search?q=${query}`)
            .url('Yandex', `https://yandex.com/search/?text=${query}`)
        msg.reply(`Search results for <code>${args1}</code>:`, {
            parse_mode: 'HTML',
            reply_markup: keyboard,
        }).catch(err => msg.api.sendMessage(channel_log_id, err) && console.log(err))
    };
});

kazuo.command('cecan', async (msg) => {
    const list = `
┌────◉ Cecan
❏ /cecann - send custom cecan image
❏ /cecanj - send japanese cecan image
❏ /cecani - send indonesian cecan image
❏ /cecanc - send chinese cecan image
❏ /cecank - send korean cecan image
❏ /cecanm - send malaysian cecan image
❏ /cecanv - send vietnam cecan image
└────◉`;
    msg.reply(list);
});

kazuo.command('cecann', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Error...\n\nExample: /cecann jepang');
    } else {
        try {
            const ok = msg.message.text.substring(msg.message.text.indexOf(' ') + 1);
            const anu = await pinterest(`cecan ${ok}`);
            const result = anu[Math.floor(Math.random() * anu.length)];
            const result2 = anu[Math.floor(Math.random() * anu.length)];
            msg.replyWithPhoto(result2);
            msg.replyWithPhoto(result);
        } catch (err) {
            msg.reply(err)
        }
    };
});

kazuo.command('cecanj', async (msg) => {
    const anu = await pinterest(`cecan jepang`);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const result2 = anu[Math.floor(Math.random() * anu.length)];
    if (msg.config.isDeveloper) {
        msg.replyWithPhoto(result);
        msg.replyWithPhoto(result2);
    } else {
        msg.replyWithPhoto(result);
    }
});
kazuo.command('cecani', async (msg) => {
    const anu = await pinterest(`cecan indo`);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const result2 = anu[Math.floor(Math.random() * anu.length)];
    if (msg.config.isDeveloper) {
        msg.replyWithPhoto(result);
        msg.replyWithPhoto(result2);
    } else {
        msg.replyWithPhoto(result);
    }
});
kazuo.command('cecanc', async (msg) => {
    const anu = await pinterest(`cecan china`);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const result2 = anu[Math.floor(Math.random() * anu.length)];
    if (msg.config.isDeveloper) {
        msg.replyWithPhoto(result);
        msg.replyWithPhoto(result2);
    } else {
        msg.replyWithPhoto(result);
    }
});
kazuo.command('cecank', async (msg) => {
    const anu = await pinterest(`cecan korea`);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const result2 = anu[Math.floor(Math.random() * anu.length)];
    if (msg.config.isDeveloper) {
        msg.replyWithPhoto(result);
        msg.replyWithPhoto(result2);
    } else {
        msg.replyWithPhoto(result);
    }
});
kazuo.command('cecanm', async (msg) => {
    const anu = await pinterest(`cecan malaysia`);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const result2 = anu[Math.floor(Math.random() * anu.length)];
    if (msg.config.isDeveloper) {
        msg.replyWithPhoto(result);
        msg.replyWithPhoto(result2);
    } else {
        msg.replyWithPhoto(result);
    }
});
kazuo.command('cecanv', async (msg) => {
    const anu = await pinterest(`cecan vietnam`);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const result2 = anu[Math.floor(Math.random() * anu.length)];
    if (msg.config.isDeveloper) {
        msg.replyWithPhoto(result);
        msg.replyWithPhoto(result2);
    } else {
        msg.replyWithPhoto(result);
    }
});

kazuo.command('ghuser', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Please provide a GitHub user username')
    } else {
        const username = msg.msg.text.substring(8)
        const res = await axios.get(`https://api.github.com/users/${username}`).catch((err) => {
            if (err.res.status === 404) {
                msg.reply('No user found')
            }
        })
        if (!res) {
            msg.reply(res404)
        }
        const { login, id, node_id, avatar_url, gravatar_id, html_url, type, site_admin, name, company, blog, location,
            email, hireable, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at
        } = res.data
        const n = 'null'
        const inline = new InlineKeyboard()
            .url('View on GitHub', html_url)
            .url('Get user Avatar', avatar_url)
        const gg = `
*Username*: ${login || n}
*User_ID*: ${id || n}
*Node_ID*: ${node_id || n}
*Gravatar_ID*: ${gravatar_id || n}
*Type*: ${type || n}
*Site_Admin*: ${site_admin || n}
*Name*: ${name || n}
*Company*: ${company || n}
*Blog*: ${blog || n}
*Location*: ${location || n}
*Email*: ${email || n}
*Hireable*: ${hireable || n}
*Bio*: ${bio || n}
*Twitter*: ${twitter_username || n}
*Public Repos*: ${public_repos || n}
*Public Gists*: ${public_gists || n}
*Followers*: ${followers || n}
*Following*: ${following || n}
*Created_At*: ${created_at || n}
*Update_At*: ${updated_at || n}`;
        await msg.replyWithPhoto(avatar_url, {
            caption: gg,
            reply_markup: inline,
            parse_mode: 'MarkdownV2'
        }).catch(err => msg.reply(err) && console.log(err) && msg.api.sendMessage(channel_log_id, err))
    }
});

kazuo.command('hen', async (msg) => {
    const aha = await hen1().catch(err => console.log(err) && msg.api.sendMessage(channel_log_id, err));
    // const nano = await pickRandom(aha);
    const { title, link, category, share_count, views_count, type, video_1, video_2 } = aha
    const gg = 'Not Available'
    const inline = new Keyboard()
        .text('Open Help Menu', '/help')
        .text('Open Premium Menu', '/kazuo_pro')
        .row()
        .text('Open Cecan Menu', '/cecan')
        .resized()
    const go = `
*Title:* ${title}
*Link:* ${link}
*Category:* ${category}
*Share_Count:* ${share_count}
*Views_Count:* ${views_count}
*Type:* ${type}
*Video_1:* ${video_1 || gg}
*Video_2:* ${video_2 || gg}`;
    try {
        await msg.reply(go, {
            reply_markup: inline,
            parse_mode: 'MarkdownV2'
        })
    } catch (err) {
        msg.reply(err).then(msg.api.sendMessage(channel_log_id, err) && console.log(err))
    }
})

kazuo.command('node', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Please provide a npm/yarn package name')
    } else {
        const package = msg.msg.text.substring(5)
        const response = await axios.get(`https://api.npms.io/v2/package/${package}`).catch((err) => {
            if (err.response.status === 404) {
                msg.reply('Package not found')
            }
        })
        if (!response) {
            msg.reply('Axios Error...')
        }
        const data = response.data.collected.metadata
        const buttons = new InlineKeyboard()
            .url('View on npm', `https://www.npmjs.com/package/${package}`)
            .url('View on yarn', `https://yarnpkg.com/package/${package}`)
        msg.reply(`<b>Package name: </b><code>${data.name}</code>\n<b>Version: </b><code>${data.version}</code>\n<b>Author: </b><code>${data.author.name}</code>\n<b>Author email: </b><code>${data.author.email}</code>\n<b>Home page: </b>${data.links.homepage}\n<b>License: </b><code>${data.license}</code>\n<b>Summary: </b><code>${data.description}</code>`, {
            reply_markup: buttons,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        }).catch(err => msg.api.sendMessage(channel_log_id, err) && console.log(err))
    }
})

kazuo.command('pip', async (msg) => {
    if (!msg.msg.text.includes(' ')) {
        msg.reply('Please provide a pip package name')
    } else {
        const packageName = msg.msg.text.substring(5)
        const response = await axios.get(`https://pypi.org/pypi/${packageName}/json`).catch((err) => {
            if (err.response.status === 404) {
                msg.reply('Package not found')
                return
            }
        })
        if (!response) {
            msg.reply(res404)
            return
        }
        const packageInfo = response.data.info
        const buttons = new InlineKeyboard().url('View on PyPI', `https://pypi.org/project/${packageName}`)
        msg.reply(`<b>Package name:</b> <code>${packageInfo.name}</code>\n<b>Version:</b> <code>${packageInfo.version}</code>\n<b>Author:</b> <code>${packageInfo.author}</code>\n<b>Author email:</b> <code>${packageInfo.author_email}</code>\n<b>Home page:</b> ${packageInfo.home_page}\n<b>License:</b> <code>${packageInfo.license}</code>\n<b>Summary:</b> <code>${packageInfo.summary}</code>`, {
            reply_markup: buttons,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        }).catch(err => msg.api.sendMessage(channel_log_id, err) && console.log(err))
    }
})

kazuo.command('hen2', async (msg) => {
    const r1 = ['porn', '', '']
    const r1_res = r1[Math.floor(Math.random() * r1.length)]
    const op1 = {
        method: 'GET',
        url: 'https://girls-nude-image.p.rapidapi.com/',
        params: { type: r1_res },
        headers: {
            'X-RapidAPI-Key': 'afcca98de4msh1f0fa822273fbb4p11bbc6jsn0c9e1b8ed968',
            'X-RapidAPI-Host': 'girls-nude-image.p.rapidapi.com'
        }
    };
    const res = await axios.request(op1)
    const { url } = res.data;
    try {
        msg.replyWithPhoto(url)
    } catch (err) {
        msg.reply('Waiting Server...').then(msg.api.sendMessage(channel_log_id, err) && console.log(err))
        const r2 = ['porn', '', '']
        const r2_res = r2[Math.floor(Math.random() * r2.length)]
        const op2 = {
            method: 'GET',
            url: 'https://porn-image1.p.rapidapi.com/',
            params: { type: r2_res },
            headers: {
                'X-RapidAPI-Key': rapid_api_key,
                'X-RapidAPI-Host': 'porn-image1.p.rapidapi.com'
            }
        };
        const res = await axios.request(options2);
        const { url } = res.data;
        try {
            msg.replyWithPhoto(url)
        } catch (err) {
            msg.reply('Error').then(msg.api.sendMessage(channel_log_id, err) && console.log(err))
        }
    }
})

