var faker = require("faker");
var CryptoJS = require("crypto-js");
require('dotenv').config()

function makePassword(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
module.exports = function(){
	var users = []
	var blogs = []
	var status = ["Busy","Travelling","Working"]
	for(var i=0; i<10; i++){
		var uuid = faker.random.uuid()
		users.push({
			id: faker.random.uuid(),
			fullName: faker.name.firstName()+" "+faker.name.lastName(),
			email: faker.internet.email(),
			password: makePassword(10),
			avatar: faker.internet.avatar(),
			status: status[Math.floor(Math.random() * 3)]
		})
		for(var j=0; j<5; j++){
			blogs.push({
				userId: uuid,
				heading: faker.random.words(6),
				blog: faker.random.words(50)
			})
		}
	}
    

    var m_uuid = faker.random.uuid()
	
	for(var i=0; i<2; i++){
		blogs.push({
			userId: m_uuid,
			heading: faker.random.words(6),
			blog: faker.random.words(50)
		})
	}
    

    users.unshift({
    	id: m_uuid,
		fullName: "Test User",
		email: "test@example.com",
		password: CryptoJS.AES.encrypt('12345678', process.env.REACT_APP_SECRET_KEY).toString(),
		avatar: faker.internet.avatar(),
		status: status[Math.floor(Math.random() * 3)]

    })

	return {users: users,blogs: blogs}
}