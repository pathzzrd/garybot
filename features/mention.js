/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    // listen for direct_mention events
    controller.on('direct_mention', async(bot, message) => {
        let meows = ['meow', 'mow', 'mrow', 'meown'];
        await bot.reply(message, meows[Math.floor(Math.random() * meows.length)]);
    });

    // listen for mention events
    controller.on('mention', async(bot, message) => {
        let reactji = [ 'thumbsup', 'vince', 'joy_cat', 'carrot-this', 'this', 'eyes' ];
        let res = await bot.api.reactions.add({
            name: reactji[Math.floor(Math.random() * reactji.length)],
            channel: message.channel,
            timestamp: message.ts,
        });
    });

}
