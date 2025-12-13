const { createServer } = require('http');
const express = require('express');
const app = express();

const server = createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
