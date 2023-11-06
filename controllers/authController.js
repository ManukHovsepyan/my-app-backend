const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const userController = {
    async registration(req, res) {
        try {
            const userData = req.body;

            await userService.registerUser(userData);
            
            return res.status(200).json({ message: "User successfully signed up" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userService.loginUser(email, password);

            const tokenPayload = {
                email: user.email,
            };

            const accessToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: '8h' });

            res.status(201).json({
                status: 'success',
                message: 'User Logged In!',
                data: {
                    email,
                    accessToken,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;
