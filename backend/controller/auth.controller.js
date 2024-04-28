const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function createNewUser(req, res) {
    const { name, username, password, email } = req.body;
    console.log(name, username, password)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // User already exists, send an error response
            return res.status(400).json({ message: "User already exists" });
        }

        // User does not exist, proceed with creating a new user
        const accessToken = jwt.sign(
            { name: username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
        const refreshToken = jwt.sign(
            { name: username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
            refreshToken: refreshToken
        });

        await newUser.save();

        // Set cookie and respond with access token
        res.cookie("token", refreshToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
          });
        res.json({ accessToken });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

module.exports = createNewUser;
