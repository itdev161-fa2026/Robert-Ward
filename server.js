import express from 'express';
import connectDatabase  from './config/db.js';
import {check, validationResult } from 'express-validator';
//Initialize express app
const app = express();

//Connect to database
connectDatabase();

//configure middleware
app.use(express.json({ extended: false })); 

//API endpoints
/**
 * @route GET /
 * @desc  test endpoint
 * 
 */
app.get ( '/',  (req,  res) =>
    res.send('http get request sent to root api endpoint')
); 

/**
 * @route POST  api/users
 * @desc  register user
 */

app.post ( '/api/users',  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],

(req,  res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        //later we need to save user to database here
        return res.send(req.body);
    }
    
});

//connection listener
app.listen(3000, () => console.log('Express server is running on port 3000'));
