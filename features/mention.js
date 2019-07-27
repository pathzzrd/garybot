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
        console.dir(message);
        
        let res = await bot.api.reaction.add({
            name: "thumbsup",
            channel: message.channel,
            timestamp: message.timestamp,
        });
        //await bot.reply(message, `You mentioned me when you said "${ message.text }"`);
    });

}
