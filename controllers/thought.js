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

    // Add or create Tought and link to associated user
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
                    return res.status(404).json({ message: "thought NOT craeted, we found no user with this id" });
                }
                res.json({message: "Thought Create successfully"});
            })

            .catch((err) => {
                res.json(err);
            });
    },


    // Update Thought by ID

    updateThought({params, body}, res ) {
        Thought.findOneAndUpdate({_id: params.id}, body, {
            new: true,
            runValidators: true,
        })
            .then((dbThoughtData) => {
                if(!dbToughtData) {
                    return res.status(404).json({ message: "No thought data with this id" });
                }
                res.json(dbThoughtData);
            })

            .catch((err) => {
                res.json(err);
            });
    },


     // NEEDS TO BE CORRECTED just a copy of Create Thought

     deleteThought({params, body}, res ) {
        Thought.findOneAndDelete({ _id: params.id })
           
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with this id" });
                }
                // Pull thought ID from the user
               return User.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: {thoughts: params.id } },
                { new: true }
               );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No thought created with no user" });   
                }
                res.json({message: "Thought Create successfully"});

            })

            .catch((err) => {
                res.json(err);
            });
    },

    // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thought;
