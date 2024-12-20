const router = require('express').Router();
const auth = require('../middleware/authMiddleware');

const {
  loginUser,
  registerUser,
  getProfile,
  updateUser,
} = require('../controllers/user.controller')

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', [auth] , getProfile);

router.put('/:id', [auth] , updateUser);

module.exports = router;

/*let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;*/