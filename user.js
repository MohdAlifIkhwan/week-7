let users;
class User {
	static async injectDB(conn) {
		users = await conn.db("sample_training").collection("users")
	}

	static async register(username, password) {
		// TODO: Check if username exists
		let res = await users.findOne({'username':username});
			console.log(username)
			console.log(res)
			if (res == null){
				// TODO: Hash password
				const bcrypt = require("bcryptjs")
				const saltRounds = 10;
				bcrypt.genSalt(saltRounds, function (saltError, salt) {
					if (saltError) {
						throw saltError
					} else {
						bcrypt.hash(password, salt, function(hashError, hash) {
							if (hashError) {
								throw hashError
							}  else {
			// TODO: Save user to database
								users.insertOne({
									"username": username,
									"Password": password,
									"HashedPassword": hash});
							}
							console.log("Username Inserted")
						
						})
						
						
					}
				})
				return 0;
			}
			else{
				console.log("Please choose other username!")
				return 1;
			} 
			
		 }
		
		

	static async login(username, password) {
		// TODO: Check if username exists
		let result = await users.findOne({'username':username});
			//console.log("username",result)
			//console.log("username2",username)
			//console.log(result[0].Password)
			if (result == null ){
				console.log("Login failed!!!")
				return null;
			}
			else{
			// TODO: Validate password
			const bcrypt = require("bcryptjs")
            let compare = await bcrypt.compare(password, result.HashedPassword);
                //result == true
            	//console.log(result);
                if (compare == true){
                    console.log("Login Successfully!")
					return 1;
				} 
                else{
                    console.log("Login failed!")
					return 0;
                }
            
			}

		// TODO: Return user object
		
	}
}

module.exports = User;
