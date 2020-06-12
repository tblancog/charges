const createEvent = (Event) => (name, createdAt) => {
  const event = new Event({ name, createdAt });
  return event.save();
};

const listEvents = (Event) => () => {
  return Event.find({}).sort("-createdAt");
};

module.exports = (Event) => {
  return {
    createEvent: createEvent(Event),
    listEvents: listEvents(Event),
  };
};
