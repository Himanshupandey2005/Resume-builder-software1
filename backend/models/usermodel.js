const db=require('../config/db');// db connect kiya import kiya 

const findUserByEmail=(email,callback)=>{
     const sql='SELECT * FROM users WHERE email = ?'; // placeholder
    db.query(sql,[email],(err,results)=>{
        if(err) return callback(err,null); // erroe check
        callback(null,results[0])// pehla user wapas bheja 
    });
};

const createUser =(name,email,password,callback)=>{
    const sql ='INSERT INTO users (name, email, password) VALUES (?, ?, ?)';//placeholder 
    db.query(sql,[name,email,password],(err,results)=>{
        if(err) return callback(err,null);//error check
        callback(null,results); //success result wapas bhejo 

    });
};

module.exports={findUserByEmail,createUser}; // export kiya dono function jo bnaya 

