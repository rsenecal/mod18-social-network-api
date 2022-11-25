const { Thought, User } = require("../models");

const thought = {
    getAllThought(req, res ) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: ('-__v'),
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },


    getThoughtById(req, res ) {
        Thought.findOne({_id: req.params.id})
            .populate({
                path: 'reactions',
                select: ('-__v'),
            })
            .select('-__v')
            // .sort({ _id: -1 })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with this id!" });
                }
                res.json(dbThoughtData)
            })

            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({params, body}, res ) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    { new: true}
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No thought, however we found no user with this id" });
                }
                res.json({message: "Thought Create successfully"});
            })

            .catch((err) => {
                res.json(err);
            });
    },


    // NEEDS TO BE CORRECTED just a copy of Create Thought

    updateThought({params, body}, res ) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    { new: true}
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No thought, however we found no user with this id" });
                }
                res.json({message: "Thought Create successfully"});
            })

            .catch((err) => {
                res.json(err);
            });
    },


     // NEEDS TO BE CORRECTED just a copy of Create Thought

     deleteThought({params, body}, res ) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    { new: true}
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No thought, however we found no user with this id" });
                }
                res.json({message: "Thought Create successfully"});
            })

            .catch((err) => {
                res.json(err);
            });
    }

}