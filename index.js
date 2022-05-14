const express = require('express');
const engine = require('ejs-mate');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const res = require('express/lib/response');

app.use(express.static("seeds/pics"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp');
    console.log('mongoose connected')
}

app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds/', async (req, res) => {
    const campgrounds = new Campground(req.body.campground);
    await campgrounds.save();
    res.redirect(`campgrounds/${campgrounds._id}`);

})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.patch('/campgrounds/:id/', async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id/', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect(`/campgrounds/`);
});

app.listen(3000, () => {
    console.log('Listening on 3000');
})