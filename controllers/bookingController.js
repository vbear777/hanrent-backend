import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}


export const checkAvailabilityOfCar = async () => {
    try {
        const {location, pickupDate, returnDate} = req.body
        //fetch all of available cars
        const cars = await Car.find({ location, isAvailable: true })

        //check date range on available cars using promise
        const availableCarsPromises = cars.map(async (car) => {
            const available = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({ success: true, availableCars})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//api to create booking
export const createBooking = async (req, res) => {
    try {
        const {_id} = req.use;
        const {car, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success: false, message: "Car is not available"})
        }

        const carData = await Car.findById(car)
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}