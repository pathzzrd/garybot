/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function(controller) {

    const spongeCase = (text) => {
        // here's the dang algorithm
        let counter = 0;
        let spongeArray = [];
        text.split('').forEach((chr) => {
            if (/[A-Za-z]/.test(chr)) {
                if (counter % 2 == 0) {
                    spongeArray.push(chr.toUpperCase());
                } else {
                    spongeArray.push(chr.toLowerCase());
                }
                counter = counter + 1;

            } else {
                spongeArray.push(chr);
            }
        });
        spongeString = spongeArray.join('');
        return spongeString;
    }

    // !spongecase
    controller.hears(/^!spongecase/i, ['message','direct_message'], async function(bot, message) {
        // removes command
        let tokens = message.text.split(' ')
        tokens.shift();
        let str = tokens.join(' ');

        await bot.reply(message,{ text: spongeCase(str) });
    });

    // randomly spongecase things sometimes because CHAOS ENERGY
    controller.on('message', async function(bot, message) {
        let chance = Math.floor(Math.random() * 1000);
        if (chance > 980) {
            await bot.reply(message,{ text: spongeCase(message.text) });
        }
    });



}
