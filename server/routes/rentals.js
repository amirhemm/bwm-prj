const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

router.get('', (req, res) => {
  Rental.find({}, (err, foundRentals) => {

    res.json(foundRentals);
  });
});

router.get('/:id', (req, res) => {
  const retnalId = req.params.id;
  Rental.findById(retnalId, (err, fountRental) => {
    if(err) {

      res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find rental!'}]})
    }
    res.json(fountRental);
  });
});

module.exports = router;
