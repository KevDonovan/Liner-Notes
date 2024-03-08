const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const PORT = '3000';
const password = 'B3!g3D0g88'
const uri = `mongodb+srv://KDonovan:${password}@cluster0.eisqvwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

app.use(express.static('public'));
app.use(bodyParser.json());

MongoClient.connect(uri, {useUnifiedTopology: true,})
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('Liner-Notes');
        const recordCollection = db.collection('records');

        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/', (req, res) => {
            db.collection('records')
            .find()
            .toArray()
            .then(results => {
                console.log(results);
                res.render('index.ejs', {records: results});
            }).catch (err => {
                console.log(err);
            })
        })
        app.post('/api/records', (req, res) => {
            recordCollection
            .insertOne(req.body)
            .then(result => {
                console.log(result);
            })
        })
        app.put('/api/records', (req, res) => {
            console.log(req.body);
            recordCollection.findOneAndUpdate({Album: 'Kid A'},
                {
                    $set: {Album: 'In Rainbows'},
                },
                {
                    upsert: true,
                }
            )
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
        })
        app.delete('/api/records', (req, res) => {
            recordCollection.deleteOne({_id: new ObjectId(req.body["_id"])})
            .then(result => {
                res.json(`Deleted ${req.body['Album']} from records`);
                console.log(`Deleted ${req.body['Album']} from records`);
            })
            .catch(err => {
                console.log(err);
            })
        })
    });

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})