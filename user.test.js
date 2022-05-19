const MongoClient = require("mongodb").MongoClient;
const User = require("./user")
//const bcrypt = require("bcryptjs")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:satu1234@sandbox.5ovvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("alif2", "test")
		console.log(res)
		expect(res).toBe(0)
	})

	test("Duplicate username", async () => {
		const res = await User.register("alif2", "test")
		console.log(res)
		expect(res).toBe(1)
	})

	test("User login invalid username", async () => {
		const result = await User.login("alif2", "satu1234")
		console.log(result)
		expect(result).toBe(null)
	})

	test("User login invalid password", async () => {
		const result = await User.login("try", "satu1234")
		console.log(result)
		expect(result).toBe(0)
	})

	test("User login successfully", async () => {
		const result = await User.login("try","test")
		console.log(result)
		expect(result).toBe(1)
	})
});