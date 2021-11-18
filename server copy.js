const express = require('express');
const fs = require('fs');
const data = require('db/transcript.json');

const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.get('/api/transcript', (req, res) => {
  const param = req.query.q;
  const col = req.query.c;

  console.log(col)

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }
  if (!col) {
     res.json({
        error: 'Missing required parameter `c`',
     });
     return;
 }


  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(`
    select ${COLUMNS.join(', ')} from books
    where ${col} like '%${param}%'
    limit 100
  `);

  res.json(convert.execToRes(r));

});

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
