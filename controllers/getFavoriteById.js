import Favorite from "../models/Favorite.js";

// GET FAVORITE  BY ID
export const getFavoriteById = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS