const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:satu1234@sandbox.5ovvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt = require("bcryptjs")

client.connect(err => {
    if (err) {
      console.log(err.message)
      return
    }
 
    const username = 'alip'; 
    const password = 'satu1234'; 
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
            throw saltError
        }  else {
            bcrypt.hash(password, salt, function(hashError, hash) {
                if (hashError) {
                    throw hashError
                    } else {
                    client.db('sample_training').collection('users').insertOne({ 
                        "Username":username,
                        "Password":password,
                        "SecuredPassword": hash});
                        console.log(hash)
                    }
                })
        }     
    })
});