require('dotenv').config();

const verifypin = async(req, res)=>{
    const pin = req.body.pin;
    try {
        if(pin = process.env.pin){
            res.status(200).json({
                msg: "pin is correct",
                success: true,
            })
        }else{
            res.status(500).json({
                msg: "pin is Incorrect",
                success: flase,
            })
        }
    } catch (error) {
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