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
    }
}