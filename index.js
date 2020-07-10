const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Device = require('./models/device');
const Route = require('./models/route');
const Detail = require('./models/detail');
const Coordonnee = require('./models/coordonnee');

const userController = require('./controllers/userController');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server !')
})

app.post('/add', async (req, res) => {
    let route = new Route({
        idDevice: "5f08e5836ba23700171f677d",
        nom: "Garde Nationale-Sousse"
    });
    try {
        let x = await route.save();
        res.status(200).send(x);
    } catch (error) {
        res.status(400).send("ERROR");
    }

});

app.get('/MainActivity', (req, res) => {
    let devices = ["MTS 6000A NO.0", "MTS 6000B NO.1"];
    let routes1 = ["Beja-Bousalem1", "Bousalem2-Beja", "Beja-Garde Nationale ", "Ouad Zarga-Bousalem2", "Ouad Zarga-Beja"];
    let routes2 = ["Tunis-Garde Nationale", "Garde Nationale-Sousse"];

    res.status(200).send({ devices, routes1, routes2 })
})

app.get('/MapsActivity', (req, res) => {

    let LatLngBoussalem = [
        { lat: 36.610536, lng: 8.973817 },
        { lat: 36.623230, lng: 9.000490 },
        { lat: 36.622584, lng: 9.003355 },
        { lat: 36.624207, lng: 9.027588 },
        { lat: 36.627048, lng: 9.030345 },
        { lat: 36.629648, lng: 9.031611 },
        { lat: 36.627814, lng: 9.034229 },
        { lat: 36.718086, lng: 9.268370 },
        { lat: 36.696886, lng: 9.296306 },
        { lat: 36.703240, lng: 9.336911 },
        { lat: 36.682491, lng: 9.368543 },
        { lat: 36.706456, lng: 9.400132 },
        { lat: 36.661330, lng: 9.460802 },
        { lat: 36.668081, lng: 9.436680 },
    ];

    let LatLngBeja = [
        { lat: 36.733290, lng: 9.183801 },
        { lat: 36.734386, lng: 9.183678 },
        { lat: 36.735835, lng: 9.182641 },
        { lat: 36.738913, lng: 9.185774 },
        { lat: 36.738917, lng: 9.185527 },
        { lat: 36.741612, lng: 9.188488 },
    ];

    res.status(200).send({ LatLngBoussalem, LatLngBeja })
})

app.get('/ChartsActivity', (req, res) => {

    let boussalemSeriesData = [
        { x: "1", value: 0, value2: 0, value3: 14 },
        { x: "10", value: 0, value2: 0, value3: -5 },
        { x: "20", value: 0, value2: 0, value3: -8 },
        { x: "30", value: 0, value2: 0, value3: -10 },
        { x: "40", value: 0, value2: 0, value3: -12 },
        { x: "50", value: 0, value2: 0, value3: -14 },
    ]

    let boussalemRoutes = [
        { event: "1", loss: "- 521.5", distance: "452.36" },
        { event: "2", loss: "- 320.5", distance: "54412.36" },
        { event: "3", loss: "- 201.5", distance: "214.36" },
        { event: "4", loss: "- 874.5", distance: "4110.36" },
        { event: "5", loss: "- 521.5", distance: "54412.36" },
        { event: "6", loss: "- 11.5", distance: "1230.36" },
        { event: "8", loss: "- 22.5", distance: "1220.36" },
        { event: "9", loss: "- 471.5", distance: "1002.36" },
        { event: "10", loss: "- 520.5", distance: "1002.36" },
        { event: "11", loss: "- 230.5", distance: "54412.36" },
        { event: "12", loss: "- 38.5", distance: "1002.36" },
    ]

    let bejaSeriesData = [
        { x: "1", value: 0, value2: 0, value: 10 },
        { x: "2", value: 0, value2: 0, value: -1 },
        { x: "3", value: 0, value2: 0, value: 0 },
        { x: "4", value: 0, value2: 0, value: 0 },
        { x: "5", value: 0, value2: 0, value: 0 },
    ]

    let bejaRoutes = [
        { event: "1", loss: "- 44.55", distance: "985.35" }
    ]

    res.status(200).send({ boussalemSeriesData, boussalemRoutes, bejaSeriesData, bejaRoutes })
})

app.listen(port, () => {
    console.log("Server started");
})