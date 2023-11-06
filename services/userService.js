const User = require('../models/User');
const { comparePassword, hashPassword } = require("../utils/passwordUtils");

const userService = {
    async registerUser(userData) {
        try {
            const { 
                    name, 
                    surname, 
                    country, 
                    date, 
                    email, 
                    phone, 
                    userName, 
                    password, 
                    countryFullName 
                } = userData;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const hashedPassword = await hashPassword(password);

            const newUser = new User({
                name,
                surname,
                country,
                date,
                email,
                phone,
                userName,
                password: hashedPassword,
                countryFullName
            });

            return await newUser.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async loginUser(email, password) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            } else {
                return user;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = userService;
