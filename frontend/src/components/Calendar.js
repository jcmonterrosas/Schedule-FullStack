import React, { Component } from "react";
import axios from "axios";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AddEventModal from "./Event";
import "./calendar.css";

const EVENT_LIMIT = 5;

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      events: [],
      showEventModal: false,
      eventToEdit: {},
      alertError: "",
      open: false
    };
  }

  handleCloseError = () => {
    this.setState({ alertError: "", open: false });
  };

  loadEvents = async () => {
    const res = await axios.get("http://localhost:4000/event");

    const formatedEvents = res.data.map((event) => {
      return {
        ...event,
        startTime: event.startTime ? new Date(event.startTime) : new Date(),
        endTime: event.endTime ? new Date(event.endTime) : new Date(),
      };
    });

    this.setState({ events: formatedEvents });
  };

  updateEvents = async (updatedEvent) => {
    await axios
      .put(`http://localhost:4000/event/${updatedEvent._id}`, {
        name: updatedEvent.name,
        description: updatedEvent.description,
        place: updatedEvent.place,
        color: updatedEvent.color,
        date: updatedEvent.date,
        startTime: updatedEvent.startTime,
        endTime: updatedEvent.endTime,
      })
      .then((response) => {
        // console.log(response);
        this.state.alertError = "";
        window.location.replace("");
      })
      .catch((error) => {
        this.state.alertError = error.response.data;
        this.toggleError();
      });
  };

  createEvent = async (newEvent) => {
    await axios
      .post(`http://localhost:4000/event`, {
        name: newEvent.name,
        description: newEvent.description,
        place: newEvent.place,
        color: newEvent.color,
        date: newEvent.date,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
      })
      .then((response) => {
        this.state.alertError = "";
        window.location.replace("");
      })
      .catch((error) => {
        this.state.alertError = error.response.data;
        this.toggleError();
      });
  };

  componentDidMount = async () => {
    await this.loadEvents();
  };

  renderDays() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const days = [];
    for (let day of daysOfWeek) {
      days.push(
        <div className="col col-center" key={day}>
          {day}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate, events } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat, {
          useAdditionalDayOfYearTokens: false,
        });
        const cloneDay = day;

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
            {isSameMonth(day, monthStart) ? (
              <div>
                <div>
                  {events
                    .filter((e) => isSameDay(cloneDay, new Date(e.startTime)))
                    .sort((a, b) => (a.time > b.time ? 1 : -1))
                    .map((e, i) => (
                      <div
                        onClick={() => this.editEvent(e)}
                        key={i}
                        className="event-data"
                        style={{ backgroundColor: `${e.color}` }}
                      >
                        {e.name}
                      </div>
                    ))}
                </div>
                <div key={"add-event-" + day} className="add-event-button">
                  <Fab
                    size="small"
                    aria-label="add"
                    onClick={() => this.onAddEventClick(cloneDay)}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  editEvent = (e) => {
    this.setState({ eventToEdit: e }, this.toggleModal);
  };

  toggleModal = () => {
    const { showEventModal } = this.state;
    const newState = { showEventModal: !showEventModal };
    if (showEventModal) {
      newState.eventToEdit = {};
    }
    this.setState(newState);
  };

  toggleError = () => {
    const { alertError } = this.state;
    const newState = { alertError: alertError, open: true };
    this.setState(newState);
  };

  onAddEventClick = (date) => {
    this.setState({ selectedDate: date });
    const { events } = this.state;
    if (
      events.filter((e) => isSameDay(date, e.startTime)).length >= EVENT_LIMIT
    ) {
      alert(`You have reached maximum events limit for the selected day`);
    } else {
      this.setState({ selectedDate: date }, this.toggleModal);
    }
  };

  handleFormSubmit = ({
    _id,
    name,
    description,
    place,
    color,
    date,
    startTime,
    endTime,
  }) => {
    if (_id) {
      const updatedEvent = {
        _id,
        name,
        description,
        place,
        color,
        date,
        startTime,
        endTime,
      };
      this.setState({}, () => {
        if(this.state.alertError !== "") this.toggleModal();
        this.updateEvents(updatedEvent);
      });
    } else {
      const newEvent = {
        name,
        description,
        place,
        color,
        date,
        startTime,
        endTime,
      };
      this.setState({}, () => {
        if(this.state.alertError !== "") this.toggleModal();
        this.createEvent(newEvent);
      });
    }
  };

  render() {
    const { showEventModal, eventToEdit } = this.state;
    let { alertError } = this.state;
    return (
      <div className="calendar">
        <Snackbar
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleCloseError}
        >
          <Alert onClose={this.handleCloseError} severity="error">
            {alertError}
          </Alert>
        </Snackbar>
        {showEventModal && (
          <AddEventModal
            showModal={showEventModal}
            toggleModal={this.toggleModal}
            handleFormSubmit={this.handleFormSubmit}
            eventToEdit={eventToEdit}
            selectedDate={this.state.selectedDate}
          />
        )}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
