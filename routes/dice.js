(()=>{

"use strict";

// Returns a random number between min and max parameters.
const randBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

// Creates an error object from status and message parameters.
const createErr = (errCode, errMsg) => {
	const err = {
		status: errCode,
		message: errMsg
	}
	return err;
};

module.exports = {
	home: (req, res, next) => {
		// /dice home route
		res.redirect('/');
	},
	sides: (req, res, next) => {
		// Return an object containing a random number between 1 and :sides request parameter
		const maxInt = parseInt(req.params.sides),
					minInt = 1,
					randNum = randBetween(minInt, maxInt + 1);

		// if randNum is set
	  if (randNum) {
			res.status(200).send({"min": minInt, "max": maxInt, "result": randNum});
	  } else {
	  	// create and send error object
	  	const err = createErr(404, "Unable to calculate random number. Enter the number of sides as a parameter e.g. /d/123");
	  	res.status(404).send(err);
	  }

	},
	minMax: (req, res, next) => {
		const maxInt = parseInt(req.params.max),
					minInt = parseInt(req.params.min),
					randNum = randBetween(minInt, maxInt + 1);
		// if randNum is set
		if (randNum) {
			res.status(200).send({"min": minInt, "max": maxInt, "result": randNum});
		} else {
			// create and send error object
	  	const err = createErr(404, "Unable to calculate random number. Check that 2 numbers are being passed as parameters e.g. /d/1/10");
	  	res.status(404).send(err);
		}
	},
	minMaxMultiple: (req, res, next) => {
		const maxInt = parseInt(req.params.max),
					minInt = parseInt(req.params.min),
					qty = parseInt(req.params.multiple),
					randNumArr = [];

	  // don't allow more than 1000 numbers
		if(qty < 1 || qty > 1000 ) {
			const err = createErr(400, "Sorry, you must enter a quantity between 1 and 1000");
 		 	res.status(400).send(err);
 		 	next();
		}

		// generate array of random numbers
		for (let i = 0; i < qty; i++) {
			let randNum = randBetween(minInt, maxInt + 1);
			if (randNum) {
				randNumArr.push(randNum);
			} else {
				break;
			}
		}

		// if array is populated send response
		if (randNumArr.length > 0) {
			res.status(200).send({"min": minInt, "max": maxInt, "quantity": qty, "result": randNumArr});
			next();
		} else {
			const err = createErr(404, "Unable to get array of random numbers. Check that 3 numbers are being passed as parameters e.g. /d/1/10/50");
	  	res.status(404).send(err);
		}

	}

}

})();
