const db = require("./../../config/constant").database;
const uri = `${db.uri}/${db.name}`;
let mongoose = require("mongoose").connect(uri);

mongoose.connection.on('connected', () => {  
  console.log('Mongoose default connection open to ' + uri);
}); 

mongoose.connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});

module.exports = mongoose;