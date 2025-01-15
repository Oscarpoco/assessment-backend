import Favorite from "../models/Favorite.js";

// GET ALL FAVORITES WITH PAGINATION
export const getAllFavorites = async (req, res) => {

    // DEFAUL TO PAGE 1 AN LIMIT OF 15
    const { page = 1, limit = 75 } = req.query;
    // ENDS


    try {
        const favorites = await Favorite.find()

            // LIMIT THE NUMBER OF FAVORITES RETURNED
            .limit(Number(limit))      
            // ENDS

            // SKIP THE NUMBER OF FAVORITES RETURNED
            .skip((page - 1) * limit) 
            // ENDS

            // EXECUTE THE  QUERY
            .exec();
            // ENDS

        // GET THE TOTAL COUNT OF FAVORITES
        const total = await Favorite.countDocuments(); 

        res.status(200).json({
            total,                          // Total number of favorites
            page: Number(page),             // Current page number
            limit: Number(limit),           // Items per page
            favorites                       // Favorites for the current page
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS