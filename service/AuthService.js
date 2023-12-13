const User = require("../models/User");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const authResponse = (userName, token) => {
    return {
        user: { name: userName },
        token,
    };
};

const registerUser = async (userData) => {
    try {
        const user = await User.create(userData);
        const token = user.createJWT();
        return authResponse(user.name, token);
    } catch (error) {
        throw new UnauthenticatedError("User Creation Failed");
    }
};

const loginUser = async (userData) => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Can not find the user");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("wrong password");
    }

    const token = user.createJWT();

    return authResponse(user.name, token);
};

module.exports = { registerUser, loginUser };
