const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next)=> {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({msg: "token not present"})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        console.log(decoded);
        req.user = {id, username}
        next()
    } catch (error) {
        return res.status(401).json({msg: "Not authorized"})
    }
}

module.exports = authMiddleware
