const pool =require('../config/db');

exports.getMe =async (req , res)=>{
    const user = await pool.query(
        'SELECT * FROM users WHERE id =$1',[req.user.id]
    );

    res.json(user.rows[0])


}

exports.updateMe =async (req , res)=>{
    const {name, address}=req.body;
    const user = await pool.query(
       'UPDATE users SET name =$1 ,address =$2 WHERE id =$3 RETURNING *',[name,address,req.user.id]
    );

    res.json(user.rows[0])


}