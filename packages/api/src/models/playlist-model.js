const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Playlist title is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Playlist", "Album"],
      required: true,
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
    publicAccessible: {
      type: Boolean,
      required: false,
      default: false,
    },
    authorName: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "track",
      },
    ],
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

PlaylistSchema.index({ title: "text" });

const Playlist = mongoose.model("playlist", PlaylistSchema);

module.exports = Playlist;
