const Event = require("../models/event");

const getAll = async (req, res) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (error) {
    res.json(error);
  }
};

const getEvent = async (req, res) => {
  const eventFound = await Event.findById(req.params.id);
  if (!eventFound) return res.status(204).json();
  return res.json(eventFound);
};

async function validation(req) {
  let eventsDay = await Event.find({ date: req.body.date });
  let actualStartTime = new Date(req.body.startTime);
  let actualEndTime = new Date(req.body.endTime);
  if (actualEndTime.getTime() - actualStartTime.getTime() < 0) {
    return 1;
  }

  if (actualStartTime.getDay() != actualEndTime.getDay()) {
    return 2;
  }

  if (eventsDay) {
    let eventFound = await Event.findOne({ startTime: req.body.startTime });
    console.log(req.params.id);
    let editEvent = await Event.findById(req.params.id);
    if (eventFound)
      if (
        req.params.id != null &&
        eventFound.startTime.getTime() == editEvent.startTime.getTime()
      ) {
        return 0;
      } else {
        return 3;
      }
    else {
      for (let e in eventsDay) {
        var timeDiference =
          eventsDay[e].startTime.getTime() - actualStartTime.getTime();
        if (timeDiference > 0) {
          let aux = actualEndTime.getTime() - actualStartTime.getTime();
          const isOverlap = timeDiference < aux ? true : false;
          if (isOverlap) return 4;
        } else {
          let aux =
            eventsDay[e].startTime.getTime() - eventsDay[e].endTime.getTime();
          const isOverlap = timeDiference > aux ? true : false;
          if (isOverlap) return 4;
        }
      }
    }
  }
}

const createEvent = async (req, res) => {
  let err = await validation(req);
  switch (err) {
    case 1:
      return res
        .status(400)
        .send("The end time cannot be earlier than the start time.");
    case 2:
      return res
        .status(400)
        .send("Events covering two different days are not allowed.");
    case 3:
      return res.status(303).send("There is already an event at this time.");
    case 4:
      return res.status(303).send("The event is overlapping.");
  }

  const newEvent = new Event(req.body);
  const savedEvent = await newEvent.save();
  res.json(savedEvent);
};

const deleteEvent = async (req, res) => {
  const eventFound = await Event.findByIdAndDelete(req.params.id);
  if (!eventFound) return res.status(204).json();
  return res.json(eventFound);
};

const updateEvent = async (req, res) => {
  let err = await validation(req);
  switch (err) {
    case 1:
      return res
        .status(400)
        .send("The end time cannot be earlier than the start time.");
    case 2:
      return res
        .status(400)
        .send("Events covering two different days are not allowed.");
    case 3:
      return res.status(303).send("There is already an event at this time.");
    case 4:
      return res.status(303).send("The event is overlapping.");
  }

  const eventUpdated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!eventUpdated) return res.status(204).json();
  return res.json(eventUpdated);
};

module.exports = {
  createEvent,
  getAll,
  getEvent,
  deleteEvent,
  updateEvent,
};
