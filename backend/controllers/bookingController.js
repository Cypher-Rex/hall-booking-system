const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
};

exports.updateBooking = async (req, res) => {
  await Booking.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: "Booking updated successfully" });
};

exports.deleteBooking = async (req, res) => {
  await Booking.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: "Booking deleted successfully" });
};
