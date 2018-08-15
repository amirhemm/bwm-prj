const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingsRoutes = require('./routes/bookings');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URI , { useNewUrlParser: true }).then(() => {
  if (process.env.NODE_ENV === 'production') {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  }
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingsRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'bwm-cli');
  app.use(express.static(appPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});
