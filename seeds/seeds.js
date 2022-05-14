// import the mongoose package to handle the mongoDB
const mongoose = require('mongoose');


// an array of 1000 random cities with locations included to make a fake database of camps
const cities = require('./cities');

// an array of random words that sound like parts of camp names
const { places, descriptors } = require('./seedHelpers');

// importing the campground model to be populated by camps
const CampgroundM = require('../models/campground');

const pics = require('./pics')
// starting the database
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp');
    console.log('mongoose connected')
}


// .${slash}pics${slash}${i + 1}.jpg




const sample = array => array[Math.floor(Math.random() * array.length)];

const slash = "/"
const seedDB = async () => {
    await CampgroundM.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100 + 10);
        const camp = new CampgroundM({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `${pics[i + 1]}`,
            description: `Beautiful campground! You can sleep under the stars with a beautiful view. The trees are lovely and give an amazing feeling. There are plenty of things to see in nature, and many trails to explore. The hiking trails can take you down by the water, or up in the mountains of mist. The sunsets on this campground are an incredible site`,
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

