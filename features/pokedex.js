/**
 * Copyright (c) My Dick Corporation. All rights reserved.
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
        let response = await pokemans.getPokemonSpeciesByName(str);

        let descriptions = response.flavor_text_entries[0].flavor_text
        let POGEYMANS = "";
        for (const description of descriptions) {
            console.dir(description.language);
            if (description.language == "en") {
                POGEYMANS = description.flavor_text;
                break;
            }
        };

        await bot.reply(message,{ text: POGEYMANS });
    });

}
