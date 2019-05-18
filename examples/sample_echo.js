/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    // match a single string
    controller.hears('sample','message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    // echo message back to user
    controller.on('message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

}
