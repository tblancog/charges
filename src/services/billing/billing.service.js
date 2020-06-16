const { Types } = require("mongoose");
const getBilling = (Event) => (userId) => {
  return Event.aggregate([
    { $match: { user: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        docs: {
          $push: {
            _id: "$_id",
            amount: "$amount",
            currency: "$currency",
            event_type: "$event_type",
            event: "$event",
            date: "$date",
            event: "$event",
          },
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};

module.exports = (Event, Payment) => {
  return {
    getBilling: getBilling(Event, Payment),
  };
};
