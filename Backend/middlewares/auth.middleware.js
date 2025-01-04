import jwt from "jsonwebtoken"
//auth 
const auth = async (req, res, next) => {
    try {
        console.log("hit")
        // extract token
        const token = req.body.token || req.cookies.token || req.header["authentication"].replace("Bearer ", "");

        //verify token 
        // console.log("token",token)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token does not provided.",
            })
        }

        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = payload;
            // console.log("user",req.user)
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid.",
            })
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while verifying token.",
            error: error
        })
    }


}

//Ordinary User
const isOrdinary = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Ordinary") {
            return res.status(401).json({
                success: false,
                message: "Protected route for Ordinary.",
            })

        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not an Ordinary User.",
            error: error
        })
    }
}

//admin
const isAdmin = async (req, res, next) => {
    try {
        // console.log(req.user)
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Protected route for admin.",
            })

        }
        next();

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            message: "Not an Admin.",
            error: error
        })
    }
}

//Agent
const isAgent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Agent") {
            return res.status(401).json({
                success: false,
                message: "Protected route for agent.",
            })

        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not an Agent.",
            error: error
        })
    }
}

export { auth, isAdmin, isAgent, isOrdinary };