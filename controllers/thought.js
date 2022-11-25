const { Thought, User } = require("../models");

const thought = {
    getAllThought(req, res ) {
        Thought.find({})
            .populatr({
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
            .populatr({
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
    }




}