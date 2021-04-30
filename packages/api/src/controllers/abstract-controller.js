const { UserRepo } = require("../repositories");

async function getAllById(req, res, Repository) {
    const {
        user: { uid },
    } = req;

    try {
        const user = await UserRepo.findOne({ firebase_id: uid });

        if (user.error) {
            res.status(500).send({
                data: null,
                error: user.error,
            });
        }

        const repo = await Repository.getAll({ authorId: user.data?._id });

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function fetchAll(req, res, Repository) {
    const repo = await Repository.getAll();

    try {
        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function getById(req, res, Repository) {
    const { id } = req;

    try {
        const repo = await Repository.getAll({ id });

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function getByName(req, res, Repository) {
    const { name } = req;

    try {
        const repo = await Repository.getAll({ name });

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function editInfo(req, res, Repository) {
    const {
        body: data,
        params: { id },
    } = req;

    try {
        const repo = await Repository.findOneAndUpdate({ _id: id }, data);

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function addFavorite(req, res, Repository) {
    const {
        user: { uid },
        params: { id },
    } = req;

    try {
        const user = await UserRepo.findOne({ firebase_id: uid });

        if (user.error) {
            res.status(500).send({
                data: null,
                error: user.error,
            });
        }

        const repo = await Repository.findOneAndUpdate(
            { _id: id },
            { $addToSet: { likedBy: user.data._id } },
        );

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(201).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function removeFavorite(req, res, Repository) {
    const {
        user: { uid },
        params: { id },
    } = req;

    try {
        const user = await UserRepo.findOne({ firebase_id: uid });

        if (user.error) {
            res.status(500).send({
                data: null,
                error: user.error,
            });
        }

        const repo = await Repository.findOneAndUpdate(
            { _id: id },
            { $pull: { likedBy: user.data._id } },
        );

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(201).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function getFavorite(req, res, Repository) {
    const { uid } = req.user;

    if (req.params.userId === "me") {
        const user = await UserRepo.findOne({ firebase_id: uid });

        req.params.userId = user.data._id;
    }

    try {
        const repo = await Repository.getAll({ likedBy: req.params.userId });

        if (repo.error) {
            return res.status(500).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                error: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

async function deleteById(req, res, Repository) {
    try {
        const repo = await Repository.findOneAndDelete({ _id: req.params.id });

        if (repo.error) {
            return res.status(400).send({
                data: null,
                error: repo.error,
            });
        }

        if (repo.data) {
            return res.status(200).send({
                data: repo.data,
                message: "Successfully deleted item",
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

module.exports = {
    getAllById,
    getById,
    fetchAll,
    getByName,
    editInfo,
    addFavorite,
    removeFavorite,
    getFavorite,
    deleteById,
};