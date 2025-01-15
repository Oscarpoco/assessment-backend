import Favorite from "../models/Favorite.js";

// CREATE newProduct
export const AddToFavorite = async (req, res) => {
    try {
        const newFavorite = await Recipe.create({
            ...req.body,      
            userID: req.user.id   
        });

        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: "Error creating product: " + error.message });
    }
};
// ENDS