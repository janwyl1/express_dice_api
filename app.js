const express = require('express');
const app = express();
const port = 3000
const dice = require('./routes/dice.js');
const diceRouter = express.Router();

app.get('/', (req, res) => res.send('this is the home route'));

app.use('/d', diceRouter);

diceRouter.get('/', dice.home);
diceRouter.get('/:sides', dice.sides);
diceRouter.get('/:min/:max', dice.minMax);
diceRouter.get('/:min/:max/:multiple', dice.minMaxMultiple);

app.use(function(err, req, res, next) {
  console.error(err); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });

module.exports = app;