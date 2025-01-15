import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { body, validationResult } from 'express-validator';

// CONTROLLERS
import { RegisterUser } from "../controllers/createUser.js";
import { LoginUser } from "../controllers/LoginUser.js";
import { AddToFavorite } from "../controllers/addToFavorite.js";
import { deleteFavoriteById } from "../controllers/deleteFromFavorite.js";
import { getAllFavorites } from "../controllers/getFavorites.js";
import { getFavoriteById } from "../controllers/getFavoriteById.js";

const router = express.Router();

// USER REGISTER AND LOGIN ROUTES

router.post(
  "/register",
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
      
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  
  RegisterUser
);

router.post("/login", LoginUser);

// USER REGISTER AND LOGIN ENDS


// POST REQUEST ROUTE
router.post("/addFavorite", protect, AddToFavorite);

// GET REQUEST ROUTE 
router.get("/favorites", protect, getAllFavorites);

// GET REQUEST USING ID ROUTE
router.get("/favorites/:id", protect, getFavoriteById);

//  DELETE REQUEST ROUTE
router.delete("/favorite/:id", protect, deleteFavoriteById);


export default router;