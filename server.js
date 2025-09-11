import express from 'express';

//Initialize express app
const app = express();

//API endpoints
app.get ( '/',  (req,  res) =>
    res.send('http get request sent to root api endpoint')
); 

//connection listener
app.listen(3000, () => console.log('Express server is running on port 3000'));
