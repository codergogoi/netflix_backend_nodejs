const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  membership: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
  },
  membershipStartDate: {
    type: Date,
  },
  membershipEndDate: {
    type: Date,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  profiles: [
    {
      title: {
        type: String, // Jayanta
      },
      category: {
        type: String, // Adult / Kids
      },
      choice: [String],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
