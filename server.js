const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = '3000';
const password = 'B3!g3D0g88'
const uri = `mongodb+srv://KDonovan:${password}@cluster0.eisqvwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

MongoClient.connect(uri, {useUnifiedTopology: true,})
    .then(client => {
        console.log('Connected to Database');
    });

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})