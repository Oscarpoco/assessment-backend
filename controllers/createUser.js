import User from "../models/User.js";
import GenerateToken from "../utils/index.js";
import bcrypt from "bcrypt";

// LOGIN / REGISTER FUNCTION
export const AuthenticateUser = async (req, res) => {
    try {
        // DATA RECEIVED FROM THE USER
        const { email, password } = req.body;

        // VALIDATE INPUT
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // FIND THE USER
        const fetchUser = await User.findOne({ email });

        // IF USER DOESN'T EXIST, REGISTER USER
        if (!fetchUser) {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await User.create({ email, password: hashedPassword });
                const UserToken = GenerateToken(newUser.id);

                return res
                    .status(200)
                    .json({
                        message: "User successfully registered",
                        id: newUser.id,
                        email: newUser.email,
                        token: UserToken,
                    });
            } catch (error) {
                console.error("Error during user registration:", error);
                return res.status(500).json({ error: "Internal server error during registration" });
            }
        }

        // VALIDATE PASSWORD FOR EXISTING USER
        const isPasswordValid = await fetchUser.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // LOGIN SUCCESS
        const UserToken = GenerateToken(fetchUser.id);
        res.status(200).json({
            message: "User logged in successfully",
            id: fetchUser.id,
            email: fetchUser.email,
            token: UserToken,
        });
        
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// ENDS
