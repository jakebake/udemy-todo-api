const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var daata = {
    id: 4
};


var token = jwt.sign(daata, '123abc');
console.log('## token', token);

var decoded = jwt.verify(token, '123abc');
console.log('## decoded', decoded);


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log('## hash', hash);
//
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'mySecretHash').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'mySecretHash').toString();
//
// if (resultHash === token.hash) {
//     console.log('## Data was not changed');
// } else {
//     console.log('## Obaaaaacht, do not trust!!!!!!!!! Alarmstufe Red!');
// }
