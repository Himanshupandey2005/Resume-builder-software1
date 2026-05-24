const jwt =require('jsonwebtoken');//token verify kerne ke liye 


const verifyToken=(req,res,next)=>{
        //request ke header se token lo=>
        const token=req.headers['authorization'];
        //token nhi hai 
        if(!token) return res.status(401).json({
            message:'not find token '
        });

        //token verify karo token hai to
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err) return res.status(401).json({
                message:"invalid token"
            });
            req.user=decoded;//decoded data req me save -- age use karenge 

            next();//age jane do
        });
    
};

module.exports=verifyToken;


