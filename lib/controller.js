const Mongo = require('./mongo');


const ready = (controller, dirname) => {
  return () => {

   controller.loadModules(dirname + '/features');

    (async () => {

      let bot = await controller.spawn("T210C9HCH");
      // if just using bot.say and not starting a dialog, can use a fake value for user id.
      await bot.startConversationInChannel("G239TENQN", "U210P0WA3");
      await connectToMongo();

      await bot.say('gary online.');
    })();

  };
};



const connectToMongo = async () => {
  try {
    console.log("connecting");
    const client = await Mongo.connect(process.env.MONGO_URI);
    const db = client.db("gary");
    await db.collection('metrics').updateOne({name: "gary" }, { "$inc": {deploys: 1}},  {upsert:true});
  } catch (e) {
    await bot.say('Error connecting to mongo');
    console.log(e);
  }
};

module.exports = {
  ready
};
