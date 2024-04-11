const { Booking } = require("../models/BookingModel");
const { Town } = require("../models/TownModel");
const { User } = require("../models/UserModel");
const { Hotel } = require("../models/HotelModel");


exports.addTown = async(req, res) => {
    let newTown = new Town(req.body);

    await newTown.save((err, town) => {
        try {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to add town!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New town is added!",
                    data: town
                });
            }
        } catch (err) {
            console.log(err);
        }
    });
};

exports.getCustomers = async(req, res) => {
    await User.find({ "userType": `${req.query.userType}` }, async function(err, user) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid user type!"
            });
        }

        if (!user) {
            return res.status(422).json({
                success: false,
                message: "Invalid user type!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customers received!",
            data: user
        });
    });
};

exports.getHotelOwners = async(req, res) => {
    await User.find({ "userType": `${req.query.userType}` }, async function(err, user) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid user type!"
            });
        }

        if (!user) {
            return res.status(422).json({
                success: false,
                message: "Invalid user type!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customers received!",
            data: user
        });
    });
};

exports.getBookings = async(req, res) => {
    await Booking.find(function(err, bookings) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrieve bookings!",
                data: err
            });
        }

        return res.status(200).json({
            success: true,
            message: "Received bookings!",
            data: bookings
        });
    });
};

exports.getHotels = async(req, res) => {
    await Hotel.find({ "city": `${req.query.city}` }, async function(err, hotels) {
        // console.log(`${req.query.city}`);
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid city!"
            });
        }

        if (!hotels) {
            return res.status(422).json({
                success: false,
                message: "Invalid City!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hotels received!",
            data: hotels
        });
    });
}