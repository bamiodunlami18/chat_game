const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to chat app');
});

app.listen(port, () => {
  console.log('Chat app started on port ' + port);
});