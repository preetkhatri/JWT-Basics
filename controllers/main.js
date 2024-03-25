const jwt = require('jsonwebtoken')

const login = async (req,res)=> {
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(400).send("Enter both the credentials")
    }

    const id = new Date().getDate()

    const token = jwt.sign({id,username}, process.env.JWT_SECRET,{expiresIn:'30d'}) 

    res.status(200).json({msg: "User created", token})
}

const dashboard = async (req,res)=> {

    console.log(req.user);
    
    const num = Math.floor(Math.random()*100)

    res.status(200).json({
        msg: `Hey, ${req.user.username}`,
        secret: `Your secret number is ${num}`
    })
}

module.exports = {
    login,
    dashboard
}
