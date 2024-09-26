const dbconnect = require('../dbconnect')

const lastestConfirmDate = (req, res) =>{
    const sqlcommand =
    `SELECT 
        MAX(st_confirmed) AS lastDateSaleOrder
    FROM 
        public.sasalesorder_tbl
    WHERE 
        st_confirmed IS NOT NULL

    `
    try {
        dbconnect.query(sqlcommand,(err,result)=>{
            if(err){
                res.status(500).json({
                    msg: "There error due to database connection",
                    data: err,
                    success: false

                })
            }else{

                const lastDateSaleOrder = (result.rows)[0].lastdatesaleorder;
                console.log(lastDateSaleOrder, typeof(lastDateSaleOrder))

                res.status(200).json({
                    msg: "",
                    data: lastDateSaleOrder,
                    success: true

                })
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "There error due to database connection",
            data: error,
            errorType: "server-connection"

        })
    }
}

module.exports ={
    lastestConfirmDate
}