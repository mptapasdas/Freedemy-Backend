const { StatusCodes } = require("http-status-codes");

const { registerUser, loginUser } = require("../service/AuthService");

const register = async (req, res) => {
    const registerResponse = await registerUser({ ...req.body });
    res.status(StatusCodes.CREATED).json(registerResponse);
};

const login = async (req, res) => {
    const loginRespone = await loginUser(req.body);
    res.status(StatusCodes.OK).json(loginRespone);
};

module.exports = {
    register,
    login,
};
