module.exports = function(app) {
    const { Auth } = require("../middleware/auth");
    const { SystemAdmin } = require("../middleware/systemAdmin");

    const SystemAdminController = require("../controllers/SystemAdminController");

    app.post("/api/add_town", [Auth, SystemAdmin], SystemAdminController.addTown);
    app.get("/api/all_customers", [Auth, SystemAdmin], SystemAdminController.getCustomers);
    app.get("/api/all_hotel_owners", [Auth, SystemAdmin], SystemAdminController.getHotelOwners);
    app.get("/api/all_bookings", [Auth, SystemAdmin], SystemAdminController.getBookings);
    app.get("/api/get_all_hotels", [Auth, SystemAdmin], SystemAdminController.getHotels);

};