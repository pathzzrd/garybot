/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function(controller) {

    let Pokedex = require('pokedex-promise-v2');

    // !pokemon
    controller.hears(/^!pokemon/i, ['message','direct_message'], async function(bot, message) {
        // removes command
        let tokens = message.text.split(' ')
        tokens.shift();
        let str = tokens.join(' ');

        let pokemans = new Pokedex();
        let response = await pokemans.getPokemonByName(str);

        await bot.reply(message,{ text: response });
    });

}
