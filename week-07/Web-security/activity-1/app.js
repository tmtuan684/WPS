require('dotenv').config();
const ipaddr = require('ipaddr.js');
const express = require('express');
const app = express();

// IP restriction middleware
app.use((req, res, next) => {
    let clientIp = req.ip;
    if (clientIp.startsWith('::ffff:')) {  // Remove IPv6 prefix if present
        clientIp = clientIp.replace('::ffff:', '');
    }
  
    const addr = ipaddr.parse(clientIp); 
    const allowedIps = ipaddr.parseCIDR(process.env.ALLOWED_IPs);
 
 
  if (addr.match(allowedIps)) {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome</h1>
    <p>Your IP address is allowed.</p>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});