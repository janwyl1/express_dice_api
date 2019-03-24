# Express.js Dice Rolling / Random Number API

Simple random number API created with Express.js. Includes unit testing with Mocha and Chai.

## Installation
Download the files, navigate to the directory and run: 
``` npm install ```

To start the app:
```npm start```

To run unit tests:
```npm test```

## Overview:
There are 3 routes:
* */d/:sides* - Roll a dice with x sides
* */d/:min/:max* - Get a random number between x and y
* */d/:min/:max/:qty* - Get an array of random numbers between x and y

## Roll a dice with x sides
Pass number of sides as a route parameter. Returns a random number between 1 and number of sides.

#### For Example:
* /d/:x
* /d/3
* /d/4
* /d/6
* /d/10
* /d/20

## Get a random number between x and y 
Pass min and max as route parameters. Returns a random number between min and max.

#### For Example:
* /d/:x/:y
* /d/1/10
* /d/100/1000

## Get multiple random numbers between x and y.
Pass min, max and quantity as parameters. Returns an array of [quantity] random numbers between min and max. Array cannot contain more than 1000 items.

#### For example:
* /d/:x/:y/:n
* /d/1/10/10
* /d/1/1337/999