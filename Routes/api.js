import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { body, validationResult } from 'express-validator';

// CONTROLLERS
import { AuthenticateUser } from "../controllers/createUser.js";

const router = express.Router();

// USER REGISTER AND LOGIN ROUTES

router.post(
  "/authentication",
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
  AuthenticateUser
);

// USER REGISTER AND LOGIN ENDS


// POST REQUEST ROUTE
// router.post("/favorite",protect, createNewRecipe);
// POST REQUEST ROUTE ENDS

// GET REQUEST ROUTE 
// router.get("/recipes", getAllRecipe);

// GET REQUEST USING ID ROUTE
// router.get("/recipe/:id", protect, getRecipe);

// EDIT REQUEST ROUTE
// router.put("/recipe/:id", protect, updateRecipe);

//  DELETE REQUEST ROUTE
// router.delete("/recipe/:id", protect, deleteRecipe);


export default router;