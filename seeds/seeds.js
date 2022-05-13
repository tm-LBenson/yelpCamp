// import the mongoose package to handle the mongoDB
const mongoose = require('mongoose');


// an array of 1000 random cities with locations included to make a fake database of camps
const cities = require('./cities');

// an array of random words that sound like parts of camp names
const { places, descriptors } = require('./seedHelpers');

// importing the campground model to be populated by camps
const CampgroundM = require('../models/campground');

// starting the database
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp');
    console.log('mongoose connected')
}





const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await CampgroundM.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new CampgroundM({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

