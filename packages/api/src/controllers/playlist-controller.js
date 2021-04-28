const { UserRepo, PlaylistRepo } = require("../repositories");

async function createTrack(req, res, next) {
    let {
        body: { title, url = null, thumbnail = null, duration = 0, genre = [], artistId = [], tracks = [], likedBy = [] },
        user: { uid },
    } = req;

    try {
        if (!title && !url) {
            res.status(400).send({
                data: null,
                error: "Missing Fields (title, url)",
            });
        }

        if (tracks.length > 0) {
            duration = tracks.reduce((accumulator, current) => accumulator + current.duration);
        }

        const user = await UserRepo.findOne({
            firebase_id: uid,
        });

        const response = await PlaylistRepo.create({
            title,
            url,
            thumbnail,
            duration,
            genre,
            authorId: user?.data?._id,
            artistId,
            tracks,
            likedBy
        });

        if (response.error) {
            return res.status(500).send({
                data: null,
                error: response.error,
            });
        }

        if (response.data) {
            return res.status(201).send({
                data: response.data,
                error: null,
            });
        }
    } catch (error) {
        next(error);
    }
}

async function getPlaylists(req, res) {
    const {
        user: { uid },
    } = req;

    //const uid = "4nCMnnoZsNPDm53RsCAFklBJtGZ2";

    try {
        const user = await UserRepo.findOne({
            firebase_id: uid,
        });

        if (user.error) {
            res.status(500).send({
                data: null,
                error: user.error,
            });
        }

        const playlists = await PlaylistRepo.getAll({ authorId: user.data._id });

        if (playlists.error) {
            return res.status(500).send({
                data: null,
                error: playlists.error,
            });
        }

        if (playlists.data) {
            return res.status(200).send({
                data: playlists.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

module.exports = {
    getPlaylists,
    createTrack
};
