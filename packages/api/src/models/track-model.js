const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Track title required"],
      trim: true,
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    cloudinaryThumbnailId: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    genre: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
      default: [],
    },
    artistId: {
      type: [
        {
          userName: {
            type: String,
            trim: true,
          },
          _id: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      default: [],
    },
    playlists: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "playlist",
          },
          time: {
            type: Date,
          },
        },
      ],
      default: [],
    },
    likedBy: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          time: {
            type: Date,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

TrackSchema.index({ title: "text" });

const Track = mongoose.model("track", TrackSchema);

module.exports = Track;
