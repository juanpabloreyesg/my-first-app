const payload = require('./hook')
const CryptoJS = require("crypto-js");



function test(){
	console.log(payload)
	var hash = CryptoJS.HmacSHA1(JSON.stringify(payload), "bcd1571414984cabb53caa0747526e10db73af8b").toString(CryptoJS.enc.Hex)
	console.log(hash)
}
	
test();