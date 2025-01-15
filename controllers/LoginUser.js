import User from "../models/User.js";
import GenerateToken from "../utils/index.js";

// LOGIN FUNCTION
export const LoginUser = async (req, res) => {
    try {
        // DATA RECEIVED FROM THE USER
        const { email, password } = req.body;

        // VALIDATE INPUT
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // FIND THE USER
        const fetchUser = await User.findOne({ email });

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
