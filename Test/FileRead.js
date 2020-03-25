const fs = require('fs');
fs.readFile('index.htm', 
    'utf8',
    (err, data) => {
        console.log(data);
    }
);