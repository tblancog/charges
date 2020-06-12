const createEvent = (Event) => ({
  event_id,
  amount,
  currency,
  user,
  event_type,
  date,
}) => {
  const event = new Event({
    event_id,
    amount,
    currency,
    user,
    event_type,
    date,
  });
  return event.save();
};

const listEvents = (Event) => () => {
  return Event.find({}).populate("user").sort("-createdAt");
};

module.exports = (Event) => {
  return {
    createEvent: createEvent(Event),
    listEvents: listEvents(Event),
  };
};
