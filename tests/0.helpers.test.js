
// helpers
//
const Mongo = require('../lib/mongo');



before(async() =>  {
  console.log('testing...');

  try {
    await Mongo.connect(process.env.MONGO_URI);


  } catch (e) {
    console.log(e);
  }

});
