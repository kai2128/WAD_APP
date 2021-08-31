require('../core/mongodb').connect();
const Cinema = require('../models/cinema');

async function creatCinema(data) {
    for (let item of data) {
        const res = await Cinema.create({
            name: item.name,
            city: item.city,
            address: item.address,
            location: item.location
        })
        console.log(res)
    }
}

let data = [];
function singleCinema(name, city, address, location) {
    return {
        name: name,
        city: city,
        address: address,
        location: [...location],
    }
}

data.push(singleCinema('Sunway Pyramid Mall', 'Petaling Jaya', 'Petaling Jaya, Selangor', [3.072820911783127, 101.60763260869389]))
data.push(singleCinema('1st Avenue Mall, ', 'GeorgeTown', 'GeorgeTown, Penang', [5.413160953499756, 100.33121830389335]))
data.push(singleCinema('Ipoh Parade', 'Ipoh', 'Ipoh, Perak', [4.595250093654234, 101.08989765944236]))
data.push(singleCinema('Tin Village Mall', 'Kampar', 'Kampar, Perak', [4.328216172208505, 101.14704607081306]))
data.push(singleCinema('Imago Mall', ', Kota Kinabalu', 'Kota Kinabalu, Sabah', [5.971032825751478, 116.06672990704652]))
data.push(singleCinema('Paradigm Mall', 'Johor Bahru', 'Johor Bahru, Johor', [1.516039626251096, 103.68554607636652]))
data.push(singleCinema('Vivacity Megamall', 'Kuching', 'Kuching, Sarawak', [1.5267391243606425, 110.37003706472277]))
// data.push(singleCinema('Vivacity Megamall', 'Kuching', 'Kuching, Sarawak', [3.072820911783127, 101.60763260869389]))

/*
Insert cinemas data into database
 */
// creatCinema(data);

/*
View all cinema
 */
Cinema.find({}, function (err, items) {
    console.log(items);
})
