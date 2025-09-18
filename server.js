import express from 'express';
import connectDatabase from './config/Db';

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

app.post ( '/api/users',  (req,  res) => {
    console.log(req.body);
    res.send(req.body);
});

//connection listener
app.listen(3000, () => console.log('Express server is running on port 3000'));
