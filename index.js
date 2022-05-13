const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp');
    console.log('mongoose connected')
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')

})


app.listen(3000, () => {
    console.log('Listening on 3000');
})