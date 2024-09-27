const dbconnect = require('../dbconnect')

const getMatid = async(req, res) =>{
    try {
        const sqlcommand = `
            SELECT 
                mmmatunit_tbl.matunitid, 
                mmmatunit_tbl.matunituserid, 
                mmmatunit_tbl.matunitrefid, 
                mmmatunit_tbl.matcategoryid, 
                mmmatunit_tbl.matid, 
                mmmat_tll.mat
            FROM 
                public.mmmatunit_tbl, 
                public.mmmat_tll
            WHERE 
                mmmatunit_tbl.matid = mmmat_tll.matid
            GROUP BY
                mmmatunit_tbl.matunitid, 
                mmmatunit_tbl.matunituserid, 
                mmmatunit_tbl.matunitrefid, 
                mmmatunit_tbl.matcategoryid, 
                mmmatunit_tbl.matid, 
                mmmat_tll.mat 
            ;
        
        `;
        await dbconnect.query(sqlcommand, (err, result)=>{
            if(err){
                res.status(500).json({
                    success: false,
                    msg: "There error due to database connection",
                    data: err,
                    errorType: "database"
                })
            }else{
                
                // console.log(result.rows)
                res.status(200).json({
                    success: true,
                    msg: "Query Matid success",
                    data: result.rows,
                    countlength: result.rows.length,
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
    getMatid
}