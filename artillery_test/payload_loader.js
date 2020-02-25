const payload = require('./hook')
const CryptoJS = require("crypto-js");

module.exports = {
loadPayload: loadPayload,

}

function loadPayload(context, events, done){
	
	
	var hash = CryptoJS.HmacSHA1(JSON.stringify(payload), "bcd1571414984cabb53caa0747526e10db73af8b").toString(CryptoJS.enc.Hex)
	

	context.vars.payload = payload;
	context.vars.key = hash
	console.log(hash)
	return done();
}

