const { User } = require("../models/UserModel");
const UserRole = require('../enums/UserRole');

const HotelOwner = (req, res, next) => {
    let token = req.header('x-access-token') || req.header('authorization');

    if (token) {
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if (err) throw err;

            console.log(user);
            if (user && user?.userType !== UserRole.HOTEL_OWNER) {
               return res.status(403).json({
                    success: false,
                    message: "No authorization to access this route!"
                });
            } else if( user === null){
               return res.status(403).json({
                    success: false,
                    message: "No authorization to access this route!"
                });
            }

            next();
        });
    }
};

module.exports = { HotelOwner };