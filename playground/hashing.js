const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
let saltUsed;
bcrypt.genSalt(10, (err, salt) => {
    console.log('## salt', salt);
    saltUsed = salt;
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('## hash1', hash);
    });
});

bcrypt.genSalt(10, (err, salt) => {
    console.log('## salt2', salt);
    saltUsed = salt;
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('## hash2', hash);
    });
});

// setTimeout(function(){
//     bcrypt.hash(password, saltUsed, (err, hash) => {
//         console.log('## hash2', hash);
//     });
// }, 1000);



// let hashedPassword = '$2a$10$.VPSFtIbvPQ1Csprqod.PuPjHEZH88KTJwZxvotmGYUQb9m5xO4LO';
//
// bcrypt.compare(password, hashedPassword, (err, res) => {
//     console.log('## res', res);
// });
// var data = {
//     id: 4
// };
//
//
// var token = jwt.sign(data, '123abc');
// console.log('## token', token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('## decoded', decoded);


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
