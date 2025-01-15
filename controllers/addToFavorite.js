import Favorite from "../models/Favorite.js";

// ADD TO FAVORITE
export const AddToFavorite = async (req, res) => {
    try {
        const newFavorite = await Favorite.create({
            ...req.body,      
            userID: req.users.id   
        });

        res.status(201).json(
        {
            message: "Successfully added to favorite",
            newFavorite
        }
        );

    } catch (error) {
        res.status(500).json({ message: "Error adding to favorite: " + error.message });
    }
};
// ENDS