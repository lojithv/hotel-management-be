module.exports = function(app) {
    const { Auth } = require("../middleware/auth");
    const { Customer } = require("../middleware/customer");

    const CustomerController = require("../controllers/CustomerController");

    app.get("/api/get_towns", [Auth, Customer], CustomerController.getTowns);
    app.get("/api/get_hotels", [Auth, Customer], CustomerController.getHotels);
    app.post("/api/add_booking", [Auth, Customer], CustomerController.addBooking);
    app.post("/api/make_payment", [Auth, Customer], CustomerController.makePayment);
    app.get("/api/get_bookings", [Auth, Customer], CustomerController.getBookings);
    app.delete("/api/delete_bookings/:id", [Auth, Customer], CustomerController.deleteBookings);

};