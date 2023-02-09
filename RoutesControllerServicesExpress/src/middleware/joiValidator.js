const Joi = require('joi');
const axios = require('axios');

const getIdSchema = Joi.object({
    id: Joi.number().integer().required()
});


const postSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(20)
        .required(),
    isCompleted: Joi.boolean()
});

const validateLogin = async (req, res, next) => {
    //console.log("sd")
    const response = await axios.post('http://localhost:3000/login', req.body);
    //console.log(response);
    if (response.data.success) {
        req.headers.authorization = response.data.token;
        res.status(200).json({ sucess: 'Login sucessfull' ,token:response.data.token});
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
    next();
};
const validateGetId = (req, res, next) => {

    const { error } = getIdSchema.validate(req.params);
    if (error) {
        res.json({ error: error.message });
    }
    else {
        next();
    }
};
const validatePostSchema = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        res.json({ error: error.message });
    }
    else {
        next();
    }
};

const validateReq = async (req, res, next) => {

    try {
        const validation = await axios.get("http://localhost:3000/verify", { headers: { authorization: req.headers.authorization } });
        if (validation.data.success) {
            next();
        }
        else {
            res.status(401).json({ error: validation.data });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

};
module.exports = { validateGetId, validatePostSchema, validateLogin,validateReq };