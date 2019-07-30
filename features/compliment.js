// copyright idk why i didn't get the ms copyright text
// (c) what am i doing wrong lol 2019




module.exports = function(controller){

  const fetch = require('node-fetch');

  const uri = 'https://complimentr.com/api'

  // compliment
  controller.hears(['compliment'], async function(bot, message) {
    // // removes command
    // let tokens = message.text.split(' ')
    // tokens.shift();
    // let str = tokens.join(' ');

    let response = await fetch(`${uri}`)
    let data = await response.json();
    // let compliment = `${data.compliment}`

    await bot.reply(message, { text: data.compliment } )
  })
}



