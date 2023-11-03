const User = require('../models/User');
const {comparePassword, hashPassword} = require("../utils/passwordUtils")
const jwt = require('jsonwebtoken')

exports.registration = async (req, res) => {
    try {
        const { name, surname, country, date, email, phone, userName, password, countryFullName } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            name,
            surname,
            country,
            date,
            email,
            phone,
            userName,
            password,
            countryFullName
        });
				console.log(password, "pass")
				newUser.password = await hashPassword(password)
				console.log(newUser.password)
        await newUser.save();

        return res.status(200).json({
            user: newUser,
            message: "User successfully signed up"
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await comparePassword(password, user.password);

		if (!isPasswordValid) {
      return res.json({ message: 'Invalid email or password' });
    }else {
			const tokenPayload = {
				email: user.email,
			};
			const accessToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: '8h' });
			// const refreshToken = jwt.sign(tokenPayload, 'REFRESH_SECRET', { expiresIn: '7d' });
			res.status(201).json({
					status: 'success',
					message: 'User Logged In!',
					data: {
						email,
						accessToken,
						// refreshToken,
					},
				});
		}
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     // Check if the refresh token is valid - perform necessary validations

//     // Example validation for demonstration purposes
//     const decoded = jwt.verify(refreshToken, 'REFRESH_SECRET');
//     const newAccessToken = jwt.sign({ email: decoded.email }, 'SECRET', { expiresIn: '1h' });

//     // Send the new access token back to the client
//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid refresh token' });
//   }
// };
