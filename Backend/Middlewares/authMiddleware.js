import jwt from 'jsonwebtoken';
import { User } from '../Model/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token){
            return res.status(401).json({
                message: "Please login to access this resource",
                success: false,
                statusCode: 401
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(decoded?.id).select("-password -refreshToken");
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Invalid Access Token"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: `Invalid or expired token : ${error.message}`,
        });
    }
}



export const isAuthorized = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                statusCode:400,
                success:false,
                message:(`User with this ${req.user.role} role is not allowed`)
            })
        }
        next();
    }
}