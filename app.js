const express = require('express');
const app = express();
const path = require('path');


app.use(verifyTime);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/our-services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/our-services.html'));
});

app.get('/contact-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/contact-us.html'));
});

// Set up static files
app.use(express.static('public'));

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Custom middleware to verify time of request
function verifyTime(req, res, next) {
  const day = new Date().getDay();
  const hour = new Date().getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.status(403).send('Sorry, our website is only available during working hours (Monday to Friday, from 9 to 17).');
  }
}