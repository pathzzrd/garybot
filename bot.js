//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the gary bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');

// Import a platform-specific adapter for slack.

const { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware } = require('botbuilder-adapter-slack');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

const Mongo = require('./lib/mongo');

// Load process.env values from .env file
require('dotenv').config();

if (!process.env.MONGO_URI || !process.env.botToken || !process.env.clientSigningSecret) {
  console.error("ERROR: Missing ENV 'MONGO_URI' or 'botToken' or 'clientSigningSecret'");
  process.exit(1);
}

let storage = null;
if (process.env.MONGO_URI) {
    storage = mongoStorage = new MongoDbStorage({
        url : process.env.MONGO_URI,
    });
}

const adapter = new SlackAdapter({
    // parameters used to secure webhook endpoint
    clientSigningSecret: process.env.clientSigningSecret,

    // auth token for a single-team app
    botToken: process.env.botToken,
});

// Use SlackEventMiddleware to emit events that match their original Slack event types.
adapter.use(new SlackEventMiddleware());

// Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
adapter.use(new SlackMessageTypeMiddleware());


const controller = new Botkit({
    debug: true,
    webhook_uri: '/api/messages',

    adapter,

    storage
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    // announce in #gary-testing that gary has been restarted.
    (async () => {

        let bot = await controller.spawn("T210C9HCH");
        // if just using bot.say and not starting a dialog, can use a fake value for user id.
        await bot.startConversationInChannel("G239TENQN", "U210P0WA3");

        try {
          console.log("connecting");
          const client = await Mongo.connect(process.env.MONGO_URI);
          const db = client.db("gary");
          await db.collection('metrics').updateOne({name: "gary" }, { "$inc": {deploys: 1}},  {upsert:true});
        } catch (e) {
            await bot.say('Error connecting to mongo');
            console.log(e);
        }


        await bot.say('gary online.');
    })();
});
