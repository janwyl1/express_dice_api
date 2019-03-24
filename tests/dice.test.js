//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Dice Test Suite', () => {

    /* Test the GET /d/:sides route  */
    describe('GET /d/:sides', () => {
        // Set number of sides
        let sides = 20;
        it('it should GET an object containing a random number between 1 and sides (' + sides + ')', (done) => {
            chai.request(app)
                .get('/d/' + sides)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.result.should.be.a('number');
                    res.body.result.should.be.above(0);
                    res.body.result.should.be.below(sides + 1);
                    done();
                });
        });
    });
    describe('GET /d/:sides (invalid request - null) ', () => {
        // Set number of sides
        let sides = "i am string";
        it('it should GET an error object with status 404', (done) => {
            chai.request(app)
                .get('/d/' + sides)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.message.should.be.string('Unable to calculate random number. Enter the number of sides as a parameter e.g. /d/123');
                    res.body.should.be.an('object');
                    done();
                });
        });
    });

    /* Test the GET /d/:min/:max route  */
    describe('GET /d/:min/:max', () => {
        // Set min and max values 
        let min = 40,
            max = 1210;
        it('it should GET an object containing a random number between min (' + min + ') and max (' + max + ') values', (done) => {
            chai.request(app)
                .get('/d/' + min + '/' + max)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.result.should.be.a('number');
                    res.body.result.should.be.above(min);
                    res.body.result.should.be.below(max);
                    done();
                });
        });
    });
    describe('GET /d/:min/:max (invalid request - null)', () => {
        // Set min and max values
        let min = "i am string",
            max = {};
        it('it should GET an error object with status 404', (done) => {
            chai.request(app)
                .get('/d/' + min + '/' + max)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.status.should.equal(404);
                    res.body.message.should.be.string('Unable to calculate random number. Check that 2 numbers are being passed as parameters e.g. /d/1/10');
                    res.body.should.be.an('object');
                    done();
                });
        });
    });

    /* Test the GET /d/:min/:max/:multiple route  */
    describe('GET /d/:min/:max/:multiple', () => {
        // Set min and max values 
        let min = 1,
            max = 8,
            multiple = 10;
        it('it should GET an array of objects, containing random numbers between min (' + min + ') and max (' + max + ') values', (done) => {
            chai.request(app)
                .get('/d/' + min + '/' + max + '/' + multiple)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.result.should.have.lengthOf.above(0);
                    res.body.result[0].should.be.a('number');
                    res.body.result[0].should.be.above(min);
                    res.body.result[0].should.be.below(max + 1);
                    done();
                });
        });
    });
    describe('GET /d/:min/:max/:multiple (invalid request - null)', () => {
        // Set min and max values
        let min = "i am string",
            max = {},
            multiple = null;
        it('it should GET an error object with status 404', (done) => {
            chai.request(app)
                .get('/d/' + min + '/' + max + '/' + multiple)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.status.should.equal(404);
                    res.body.message.should.be.string('Unable to get array of random numbers. Check that 3 numbers are being passed as parameters e.g. /d/1/10/50');
                    res.body.should.be.an('object');
                    done();
                });
        });
    });
    describe('GET /d/:min/:max/:multiple (invalid request - qty too big)', () => {
        // Set min and max values
        let min = 1,
            max = 50,
            multiple = 1001;
        it('it should GET an error object with status 400', (done) => {
            chai.request(app)
                .get('/d/' + min + '/' + max + '/' + multiple)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.status.should.equal(400);
                    res.body.message.should.be.string('Sorry, you must enter a quantity between 1 and 1000');
                    res.body.should.be.an('object');
                    done();
                });
        });
    });

});