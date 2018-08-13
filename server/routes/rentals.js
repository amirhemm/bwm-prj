const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const { authMiddleware } = require('../controllers/user');
const { normalizeErrors } = require('../helpers/mongoose');


router.get('/secret',authMiddleware, (req, res) => {
  res.json({'secret': true});
});

router.get('/:id', (req, res) => {
  const retnalId = req.params.id;
  Rental.findById(retnalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec((err, foundRental) => {
      if(err) {
        return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find rental!'}]});
      }
      return res.json(foundRental);
    });
});

router.get('', (req, res) => {
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};
  Rental.find(query)
    .select('-bookings')
    .exec((err, foundRentals) => {
      if(err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      if(city && foundRentals.length === 0) {
        return res.status(422).send({errors: [{title: 'No rentals found!', detail: `There are no rentals for the city of ${city}`}]});
      }
      return res.json(foundRentals);
    });
});

router.post('', authMiddleware, (req, res) => {
  const user = res.locals.user
  const {title, city, street, category, image, bedrooms, shared, description, dailyRate } = req.body;

  const rental = new Rental({
    user,
    title,
    city,
    street,
    category,
    image,
    bedrooms,
    shared,
    description,
    dailyRate
  });
  rental.user = user;

  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    User.update({_id: user.id}, {$push: {rentals: newRental}}, () => {});

    return res.json(newRental);
  });
});



module.exports = router;
