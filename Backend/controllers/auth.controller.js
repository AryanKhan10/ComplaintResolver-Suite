import {User} from "../models/user.model.js"
import {OTP} from "../models/otp.model.js"
// import otpGenerator from "otp-generator"
import {encrypt} from "../utiles/cipher.js"
import speakeasy from "speakeasy"
// send otp
const sendOTP = async (req, res) =>{
    try {
        // console.log(req.body)
        const {email} = req.body
        console.log(email)
    const emailCheck = await User.findOne({email})

    if(emailCheck){
        return res.status(403).json({
            success:false,
            message:"User already Exist. "
        })
    }

    // Generate a secret key using speakeasy
    const secret = speakeasy.generateSecret({ length: 20 });

    console.log("secret ",secret)
    // Generate the OTP
    const otp = speakeasy.totp({ secret: secret.base32, encoding: 'base32',digits: 6  });
    console.log("otp ",otp)
    // Encrypt the secret and OTP
    const encryptedSecret = encrypt(secret.base32);
    const encryptedOtp = encrypt(otp);
    // console.log("encSec ",encryptedSecret)
    // console.log("encOtp ",encryptedOtp)
    const otpPayload = {email,
        otpSecret: encryptedSecret.encryptedData,
        otp: encryptedOtp.encryptedData,
        otpIv: encryptedSecret.iv // Store the IV for decryption
        }
    await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:"otp Sent ",
            otp: encryptedOtp.encryptedData
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"problem, geneating otp",
            error:error
        });
    }
}

export {sendOTP}