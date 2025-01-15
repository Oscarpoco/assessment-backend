import User from "../models/User.js";
import GenerateToken from "../utils/index.js";
import bcrypt from "bcrypt";

// REGISTER FUNCTION
export const RegisterUser = async (req, res) => {
    try {
        // DATA RECEIVED FROM THE USER
        const { email, password } = req.body;

        // VALIDATE INPUT
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE NEW USER
        const newUser = await User.create({ email, password: hashedPassword });
        const UserToken = GenerateToken(newUser.id);

        // SUCCESS RESPONSE
        return res.status(201).json({
            message: "User successfully registered",
            id: newUser.id,
            email: newUser.email,
            token: UserToken,
        });

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: "Internal server error during registration" });
    }
};
// ENDS
