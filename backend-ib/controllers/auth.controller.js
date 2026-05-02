const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

exports.register = async(req , res ,next)=>{
    try{
        const {name,email,password} = req.body;

        const hashpassword = await bcrypt.hash(password,10);
        const user =await pool.query(
            'INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING id,email',
            [name,email,hashpassword]
        );

        res.status(201).json(user.rows[0]);
    }
    catch(err){
        next(err);
    }


};

exports.login = async(req , res ,next)=>{
    try{
        const {email,password} = req.body;

       const user= await pool.query('SELECT * FROM users WHERE EMAIL =$1',[email]);

       if (!user.rows.length){
        return res.status(401).json({message:'Invalid user'});
       }

       const uservalidation = await bcrypt.compare(password,user.rows[0].password);
       if (!uservalidation){
        return res.status(401).json({message:'Invalid user'});
       }
       const token = jwt.sign({id:user.rows[0].id, role: user.rows[0].role},process.env.JWT_SECRET);



        res.status(201).json(user.rows[0]);
    }
    catch(err){
        next(err);
    }


};