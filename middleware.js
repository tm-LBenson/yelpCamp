const Campground = require('./models/campground');
const AppError = require('./utils/AppError');
const { campSchema, reviewSchema } = require('./joiSchemas.js');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You must login first!')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateForm = (req, res, next) => {


    const { error } = campSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next()
    }
}

module.exports.isAuthor = async (req, res, next) => {

    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission for that.');
        return res.redirect('/');
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {

    const review = await Review.findById(req.params.reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission for that.');
        return res.redirect("/");
    }
    next();
}

module.exports.findCamp = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    next();
}