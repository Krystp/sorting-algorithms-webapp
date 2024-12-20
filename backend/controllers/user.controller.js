const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');


// @route   POST api/users/register
// @desc    Register a user
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        let toasts = [];
        if(!username) toasts.push({message: 'Numer indeksu jest wymagany', type: 'error'});

        if(!password) toasts.push({message: 'Hasło nie spełnia wymagań', type: 'error'});
        if(password && password.length < 3) toasts.push({message: 'Hasło musi mieć conajmniej 3 znaki długości', type: 'error'});

        if(!email || !validatedEmail(email)) toasts.push({message: 'Poprawny E-mail jest wymagany', type: 'error'});

        if(toasts.length > 0) return res.status(400).json(toasts);

        let newUser = await User.findOne({email});

        if(newUser) return res.status(400).json([{message: 'Taki użytkownik już istnieje', type: 'error'}])

        newUser = new User(req.body);

        //Hash password before instert into database
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save()

        const payload = {
            user: {
                id: newUser._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 28800
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        })
        
    }catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server error');
    }
}


// @route   POST api/users/login
// @desc    Login a user
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let toasts = [];
        if(!password) toasts.push({message: 'Hasło nie spełnia wymagań', type: 'error'});
        if(password && password.length < 3) toasts.push({message: 'Hasło musi mieć conajmniej 3 znaki długości', type: 'error'});

        if(!email || !validatedEmail(email)) toasts.push({message: 'Poprawny E-mail jest wymagany', type: 'error'});

        if(toasts.length > 0) return res.status(400).json(toasts);

        let user = await User.findOne({email});

        if(!user) return res.status(400).json([{message: 'Taki użytnik nie istnieje', type: 'error'}])

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json([{message: 'Nieprawidłowe dane uwierzytelniające', type: 'error'}]);

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 28800
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        })

    }catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server error');
    }
}

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password').select('-__v')
            .select('-createdAt').select('-updatedAt');

        if(!user) return res.status(404).json([{message: 'Taki użytkownik nie istnieje', type: 'error'}]);

        res.json(user);
    }catch(err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server error');
    }
}

const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.params.id;

        if(userId !== req.user.id) {
            return res.status(401).json([{message: 'Nieautoryzowana akcja', type: 'error'}]);
        }

        if(!email || !validatedEmail(email)) {
            return res.status(400).json([{message: 'Niepoprawny adres e-mail', type: 'error'}])
        }

        if(!username || !validatedUsername(username)) {
            return res.status(400).json([{message: 'Niepoprawny numer indeksu', type: 'error'}])
        }
        
        let user = await User.findOneAndUpdate({_id: userId}, req.body, {new: true});

        if(!user) return res.status(404).json([{message: 'Taki użytkownik nie istnieje', type: 'error'}]);

        res.json(user);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server error');
    }
}

function validatedEmail(email){
    const regex = /\S+@\S+\.\S+/;
    // valid@email.com returns true whereas validemail.com returns false
    return regex.test(email);
}

function validatedUsername(username) {
    const regex = /^\d+$/;
    return regex.test(username);
  }

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateUser,
}