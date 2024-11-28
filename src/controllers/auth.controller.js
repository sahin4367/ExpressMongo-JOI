import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";

const register = async (req, res, next) => {
    const data = await Joi.object({
        fullname: Joi.string().trim().min(3).max(40).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(20).required()
    })
    .validateAsync(req.body, { abortEarly: false })
    .catch(err => {
        return res.status(400).json({
            error : err.details.map(d => d.message)
        });
    });

    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await User.create(data);
    return res.status(200).json({ newUser });
};


const login = async (req, res, next) => {
    const data = await Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(20).required()
    })
    .validateAsync(req.body, { abortEarly: false })
    .catch(err => {
        return res.status(400).json({
            error: err.details.map(d => d.message)
        });
    });

    const user = await User.findOne({
        email: data.email
    });

    if (!user) {
        return res.json({ message: `Password or email incorrect! ${data.email}` });
    }

    const password = await bcrypt.compare(data.password, user.password);

    if (!password) {
        return res.json({ message: `Password or email incorrect! ${data.email}` });
    }

    // token isleri 
    const payload = { say: user._id };
    const jwt_secret = process.env.SECRET_KEY || "default_secret_key";
    const token = jwt.sign(payload, jwt_secret);

    return res.json({
        token: token
    });
};

export const authController = {
    login,
    register
};
