const fs = require('fs');

// reading json file
let jsonData = require('./db/users.json');
console.log(jsonData);


const users = [
    {id:1, username: "mukesh", password: "secret"},
    {id:2, username: "shubham", password: "secret"},
    {id:3, username: "satish", password: "secret"},
  ]

let data = JSON.stringify(users);
// fs.writeFileSync('./db/users.json', data);