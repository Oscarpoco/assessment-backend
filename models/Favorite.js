import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {

    // USERID
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // ACTIVITY NAME
    activityName: {
      type: String,
      required: true, 
      trim: true, 
    },

    // ACTIVITY WORKING HOURS
    activityWorkingHours: {
      type: String,
      default: "Not specified", 
    },

    // ACTIVITY RESTRICTIONS
    activityRestrictions: {
      type: String,
      default: "No restrictions",
    },

    // ACTIVITY COORDINATES
    activityCoordinates: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      }, 
      required: true,
    },

    // ACTIVITY IMAGES
    activityImages: [
      {
        type: String, 
      },
    ],

    // ACTIVITY LOCATION
    activityLocation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
