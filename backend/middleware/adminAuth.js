import jwt from 'jsonwebtoken'
//wherever admin permission is required, adminAuth is used.


const adminAuth = async (req,res,next) => {
    try {
        console.log(req.headers);
        
        const {token} = req.headers
        console.log(token);
        if(!token){
            return res.json({success:false,message:"not authorised login"});
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({success:true,message:"not authorised login"});
        }
        next();
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export default adminAuth;