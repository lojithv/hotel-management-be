const { Hotel } = require("../models/HotelModel");
const { Booking } = require("../models/BookingModel");

// find bookings relevent to the hotel HotelOwner
// need to add hotel owner id into booking

exports.getBookings = async(req, res) => {
    await Booking.find({ 'hotelOwner_id': req.params.id }, async function(err, booking) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid booking id!"
            });
        }

        if (!booking) {
            return res.status(422).json({
                success: false,
                message: "Invalid booking id!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "cBookings received!",
            data: booking
        });
    });
};

exports.getHotels = async(req, res) => {
    await Hotel.find({ 'hotelOwner_id': req.params.id }, async function(err, hotel) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid hotelOWner id!"
            });
        }

        if (!hotel) {
            return res.status(422).json({
                success: false,
                message: "Invalid hotel id!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hotels received!",
            data: hotel
        });
    });
};

exports.updateHotel = async(req, res) => {
    await Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, hotel) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid HOtel id!"
            });
        }

        if (!hotel) {
            return res.status(422).json({
                success: false,
                message: "Invalid HOtel id!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "HOtel updated!",
            data: hotel
        });
    });
};

exports.addHotel = async(req, res) => {
    let newHotel = new Hotel(req.body);

    await newHotel.save((err, hotel) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to add hotel!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New hotel is added!",
                data: hotel
            });
        }
    });
};