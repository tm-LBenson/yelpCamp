const express = require('express');
const router = express.Router({ mergeParams: true });
const funCatch = require('../utils/funCatch');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const AppError = require('../utils/AppError');
const reviews = require('../controllers/reviews')


router.post('/', isLoggedIn, validateReview, funCatch(reviews.submit))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, funCatch(reviews.delete))

module.exports = router