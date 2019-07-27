/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    // listen for direct_mention events
    controller.on('direct_mention', async(bot, message) => {
        //await bot.reply(message, `I heard a direct mention that said "${ message.text }"`);
        await bot.reply(message, "meow");
    });

    // listen for mention events
    controller.on('mention', async(bot, message) => {
        let reactji = [ 'thumbsup', 'vince', 'joy_cat', 'carrot-this', 'this' ];
        let res = await bot.api.reactions.add({
            name: reactji[Math.floor(Math.random() * reactji.length)],
            channel: message.channel,
            timestamp: message.ts,
        });
    });

}
