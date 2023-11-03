const bcrypt = require('bcrypt');

async function hashPassword(plaintextPassword) {
	const result = await bcrypt.hash(plaintextPassword, 10);
	return result;
}
async function comparePassword(plaintextPassword, hash) {
	const status = await bcrypt.compare(plaintextPassword, hash);
	console.log({status})
	return status;
}

module.exports = { hashPassword, comparePassword };
