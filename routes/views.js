const express = require('express');
const router = express.Router();
const http = require('http');

router.get("/", (req, res) => {
  const options = {
    hostname: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT || 3000,
    path: '/jobs',
    method: 'GET'
  };

  const request = http.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const jobs = JSON.parse(data); 
        res.render('index', { jobs }); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  });

  request.on('error', (error) => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });

  request.end();
});


module.exports = router;
