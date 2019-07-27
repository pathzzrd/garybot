/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function(controller) {

    // !spongecase
    controller.hears(/^!spongecase$/i, ['message','direct_message'], async function(bot, message) {
        // removes command
        let str = message.text.split(' ').shift().join(' ');

        // here's the dang algorithm
        let counter = 0;
        let spongeArray = [];
        str.split('').forEach((chr) => {
            if (/A-Za-z/.test(chr)) {
                if (counter % 2 == 0) {
                    spongeArray.push(chr.toUpperCase());
                } else {
                    spongeArray.push(chr.toLowerCase());
                }
                counter++;

            } else {
                spongeArray.push(chr);
            }
        });
        spongeString = spongeArray.join('');
        await bot.reply(message,{ text: spongeString });
    });

}
