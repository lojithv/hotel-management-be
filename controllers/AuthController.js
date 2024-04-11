const { User } = require("../models/UserModel");

exports.registerUser = async(req, res) => {
    console.log("register",req.body)
    const user = new User(req.body);

    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Registration failed check validation errors!",
                data: err.message
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully Signed Up!",
                user: user
            });
        }
    });
};

exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Email!" });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                //isMatch is eaither true or false
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: "Invalid Password!" });
                } else {
                    user.generateToken((err, token) => {
                        if (err) {
                            return res.status(400).send({ 'success': false, message: err });
                        } else {
                            // console.log(res);
                            res.status(200).json({
                                success: true,
                                message: "Successfully Logged In!",
                                data: {
                                    "token": token
                                },
                                user: user
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.getUserDetails = (req, res) => {
    res.json({ status: true, message: "User Received!", data: req.user });
};