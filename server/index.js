const express = require('express')
const cors = require('cors');
const app = express()
var path = require('path');
const PORT = 5000

app.use(cors())
app.use(express.json());


app.get('/frete-gratis', function (req, res) {
    res.sendFile(path.join(__dirname, '/jsons', 'comfretegratis.json'));
})

app.get('/sem-frete-gratis', function (req, res) {
    res.sendFile(path.join(__dirname, '/jsons', 'semfretegratis.json'));
})

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`)
})
