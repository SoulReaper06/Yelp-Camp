const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64ad9a77c02720e73c76089c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: { 
               type: 'Point',
               coordinates: [ 
                  cities[random1000].longitude,
                  cities[random1000].latitude, 
               ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dgwuyhsde/image/upload/v1692190847/YelpCamp/nex7k5deeqwc3ip29zbd.jpg',
                  filename: 'YelpCamp/nex7k5deeqwc3ip29zbd',
                },
                {
                  url: 'https://res.cloudinary.com/dgwuyhsde/image/upload/v1692190849/YelpCamp/y66apu8ghs0gpqdrn0a0.jpg',
                  filename: 'YelpCamp/y66apu8ghs0gpqdrn0a0',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})