/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function(controller) {

    const fetch = require('node-fetch');
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;

    const useragent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"

    // !summon
    controller.hears(/^!summon/i, ['message','direct_message'], async function(bot, message) {
        // removes command
        let tokens = message.text.split(' ')
        tokens.shift();
        let str = tokens.join(' ');

        let response = await fetch (`https://www.google.com/search?q=${encodeURI(str)}&tbm=isch`, { headers: {"User-Agent": useragent }})
        let html = await response.text()
        dom = new JSDOM(html)
        let imageurl = JSON.parse(dom.window.document.getElementsByClassName('rg_meta').item(0).innerHTML).ou;

        await bot.reply(message,{ blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*SUMMONED ${str.toUpperCase()}*`
                }
            },
            {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": `${str.toUpperCase()}`
                },
                "image_url": imageurl,
                "alt_text": `${str.toUpperCase()}`
            }
        ]});
    });

}
