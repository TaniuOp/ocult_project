const express = require('express');
const router = express.Router();
const questionsApi = require('../controllers/questionsApi');
const userApi = require('../controllers/userApi');
const userControllers = require('../controllers/userControllers');
const verifySignUp = require('../middlewares/verifySignUp');
const verifyUserToken = require('../middlewares/verifyUserToken');

router.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// router.get('/', (req, res) => {
//   res.send("Localhost working!")
// });

//Routes 
router.get('/api/questions', questionsApi);
router.post('/api/score', userControllers.userScore);

router.get('/api/score', async (req, res) => {
  const data = await userControllers.getUserScore(req.query.email)
  res.status(200).json(data);    
})

//Admin routes 
router.get('/api/dashboard',userControllers.getUsers);
// verifyUserToken.isAdmin , verifyUserToken.verifyToken,  
// Autentication Routes 
router.post('/api/signup', verifySignUp.checkDuplicateEmail, userControllers.createUser);
router.post('/api/login', userControllers.userLogin);


// User profile route 
router.get('/api/profile', verifyUserToken.verifyToken, verifyUserToken.isEmployee, userControllers.getActualUser);

module.exports = router;
  