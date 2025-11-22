const https = require('https');
const fs = require('fs');

const options = {
    hostname: "en.wikipedia.org",
    port: 443,
    path: "/wiki/Peter_Kreeft",
    headers: {
        "User-Agent": "I learn writing web request script",
    },
    method: "GET" 
 };

 const request = https.request(options, res => {
    let responseBody = "";
    res.setEncoding("UTF-8");
    res.on("data", chunk => {
        console.log("Chunk length", chunk.length);
        responseBody += chunk;
    });
    res.on("end", () => {
        fs.writeFile("peterkreeft.html", responseBody, err => {
            if(err) 
                throw err;
            console.log("File downloaded");
        })
    })
 });

 request.end();

 