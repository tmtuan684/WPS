const express = require('express');
const app = express();

app.get('/onedrivecdn', (req, res) => {
    res.send(`<img src="https://1drv.ms/i/c/16fffdf2b19992c3/IQRbztKciprZS4xIPSCDLlVrAV56tvUtDejLjt6u4YU94Po?width=3002&height=1686" width="800"/>`);
});

app.get('/googledrivecdn', (req, res) => {
    res.send(`<img src="https://drive.google.com/thumbnail?id=19eX1ZkMLNx4ZbF8pbbqHEET-5hByKWQP&sz=w1000" />`);
})
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000/`);
})