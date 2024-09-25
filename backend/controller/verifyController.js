require('dotenv').config();

const verifypin = async(req, res)=>{
    const pin = req.body.pin;
    console.log(pin)
    try {
        if(pin == process.env.pin){
            res.status(200).json({
                msg: "pin is correct",
                success: true,
            })
        if(pin !==process.env.pin){
            res.status(401).json({
                msg: "pin is Incorrect",
                success: flase,
            })
        }
        }else{
            res.status(500).json({
                msg: "pin is Incorrect",
                success: flase,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "There error due to database connection",
            data: error
        })
    }
} 

module.exports ={
    verifypin
}