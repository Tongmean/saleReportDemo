const dbconnect = require('../dbconnect')

const getSaleorder = async(req, res) =>{
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    console.log("startDate", startDate, typeof(startDate), "\n endDate :", endDate, typeof(endDate));
    try {
        const sqlcommand =`
        SELECT 
            sasalesorder_tbl.salesorderuserid, 
            sasalesorder_tbl.datedoc, 
            sasalesorder_tbl.customerid, 
            sasalesorder_tbl.personnelid_sales, 
            sasalesorderitem_tbl.itemnumber, 
            sasalesorderitem_tbl.sourceid, 
            sasalesorderitem_tbl.matunitid, 
            sasalesorderitem_tbl.quantity, 
            sasalesorderitem_tbl.unitsize, 
            sasalesorderitem_tbl.agquantity, 
            sasalesorderitem_tbl.quantityended, 
            sasalesorderitem_tbl.unitprice, 
            sasalesorderitem_tbl.unitdiscount, 
            sasalesorderitem_tbl.discount, 
            sasalesorderitem_tbl.netamount, 
            sasalesorderitem_tbl.st_ended
        FROM 
            public.sasalesorder_tbl
        JOIN 
            public.sasalesorderitem_tbl ON sasalesorder_tbl.salesorderid = sasalesorderitem_tbl.salesorderid
        WHERE 
            sasalesorder_tbl.st_confirmed >= $1 
            AND sasalesorder_tbl.st_confirmed <= $2
        GROUP BY
            sasalesorder_tbl.salesorderuserid, 
            sasalesorder_tbl.datedoc, 
            sasalesorder_tbl.customerid, 
            sasalesorder_tbl.personnelid_sales, 
            sasalesorderitem_tbl.itemnumber, 
            sasalesorderitem_tbl.sourceid, 
            sasalesorderitem_tbl.matunitid, 
            sasalesorderitem_tbl.quantity, 
            sasalesorderitem_tbl.unitsize, 
            sasalesorderitem_tbl.agquantity, 
            sasalesorderitem_tbl.quantityended, 
            sasalesorderitem_tbl.unitprice, 
            sasalesorderitem_tbl.unitdiscount, 
            sasalesorderitem_tbl.discount, 
            sasalesorderitem_tbl.netamount, 
            sasalesorderitem_tbl.st_ended
    
        `
        await dbconnect.query(sqlcommand,[startDate, endDate], (err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    success: false,
                    msg: "There error due to database connection",
                    data: err,
                    errorType: "database"

                })
            }else{
                res.status(200).json({
                    success: true,
                    msg: "Query sale order success",
                    data: result.rows,
                    countlength: result.rows.length

                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "There error due to database connection",
            data: error,
            errorType: "server-connection"

        })
    }
}


module.exports ={
    getSaleorder
}