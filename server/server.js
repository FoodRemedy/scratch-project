const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

// needed to fix fetching problem in react
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client')));

// listens, confirms connection
app.listen(PORT, () => {
  console.log(`Success! Your application is running on port ${PORT}.`);
});
