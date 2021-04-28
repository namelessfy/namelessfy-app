const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema(
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
        duration: {
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
                    type: String
                },
            ],
            required: true,
            default: [],
        },
        tracks: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "track",
                },
            ],
            default: [],
        },
        likedBy: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

const Playlist = mongoose.model("playlist", PlaylistSchema);

module.exports = Playlist;
