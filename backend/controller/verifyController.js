require('dotenv').config();

const verifypin = async (req, res) => {
    const pin = req.body.pin;
    console.log(pin, typeof(pin));
    try {
        // Check if the pin is correct
        if (pin === process.env.pin) {
            return res.status(200).json({
                msg: "pin is correct",
                success: true,
            });
        } else {
            // If the pin is incorrect
            return res.status(401).json({
                msg: "pin is Incorrect",
                success: false,
                data: process.env.pin
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "There was an error due to a database connection",
            data: error,
        });
    }
};

module.exports = {
    verifypin,
};
