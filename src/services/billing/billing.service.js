const { Types } = require("mongoose");
const getBilling = (Event) => (userId) => {
  return Event.aggregate([
    { $match: { user: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        docs: {
          $push: "$$ROOT",
        },
      },
    },
  ]).sort("_id.year, _id.month");
};

module.exports = (Event) => {
  return {
    getBilling: getBilling(Event),
  };
};
