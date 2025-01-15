import Favorite from "../models/Favorite.js";

// DELETE FAVORITE BY ID
export const deleteFavoriteById = async (req, res) => {
    try {
        const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
        
        if (!deletedFavorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        res.status(200).json({ message: "Favorite deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS