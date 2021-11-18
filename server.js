const express = require('express');
const fs = require('fs');
const data = require('./db/transcript.json');

const app = express();

console.log(data)
app.set('port', (process.env.PORT || 3002));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.get('/api/transcript', (req, res) => {
  
  console.log(data);
  res.send(data);

})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

const path = require('path');
// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
