import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import axios from "axios";
import "./event.css";

class AddEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal || false,
      toggleModal: this.props.toggleModal,
      eventToEdit: this.props.eventToEdit,
      handleFormSubmit: this.props.handleFormSubmit,
      selectedDate: this.props.selectedDate,
      loadEvents: this.props.loadEvents,
      colors: [],
      cities: [],
    };
  }

  loadColors = async () => {
    const res = await axios.get("http://localhost:4000/colors");
    this.setState({ colors: res.data });
  };

  loadCities = async () => {
    const res = await axios.get("http://localhost:4000/cities");
    this.setState({ cities: res.data });
  };

  deleteEvent = async () => {
    const { _id } = this.state.eventToEdit;
    await axios.delete(`http://localhost:4000/event/${_id}`);
    this.state.loadEvents();
    this.state.toggleModal();
  };

  componentDidMount = async () => {
    await this.loadColors();
    await this.loadCities();
  };

  submitForm = (e) => {
    e.preventDefault();
    let { _id, name, description, place, color, date, startTime, endTime } =
      this.state.eventToEdit;
    place = place != null ? place : "";
    color = color != null ? color : "Chartreuse";
    date = date != null ? date : format(this.state.selectedDate, "yyyy-MM-dd");
    startTime = startTime != null ? startTime : new Date(date.concat("T00:00"));
    endTime = endTime != null ? endTime : new Date(date.concat("T00:30"));
    this.state.handleFormSubmit({
      _id,
      name,
      description,
      place,
      color,
      date,
      startTime,
      endTime,
    });
  };

  setName = (name) => {
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        name: name,
      },
    }));
  };

  setDescription = (description) => {
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        description: description,
      },
    }));
  };

  setPlace = (place) => {
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        place: place,
      },
    }));
  };

  setColor = (color) => {
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        color: color,
      },
    }));
  };

  setDate = (date) => {
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        date: date,
      },
    }));
  };

  setStartTime = (time, date) => {
    time = "T".concat(time);
    let startTime = "";
    if (date != null) {
      startTime = new Date(date.concat(time));
    } else {
      startTime = new Date(
        format(this.state.selectedDate, "yyyy-MM-dd").concat(time)
      );
    }
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        startTime: startTime,
      },
    }));
  };

  setEndTime = (time, date) => {
    time = "T".concat(time);
    let endTime = "";
    if (date != null) {
      endTime = new Date(date.concat(time));
    } else {
      endTime = new Date(
        format(this.state.selectedDate, "yyyy-MM-dd").concat(time)
      );
    }
    this.setState((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        endTime: endTime,
      },
    }));
  };

  render() {
    const { _id, name, description, place, color, date, startTime, endTime } =
      this.state.eventToEdit;
    return (
      <div>
        <Modal open={this.state.showModal} onClose={this.state.toggleModal}>
          <div className="paper add-event-modal">
            <center>
              <h2 id="simple-modal-title">
                {_id ? "Edit Event" : "Create Event"}
              </h2>
            </center>
            <form onSubmit={this.submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id={name}
                    label="Name"
                    variant="outlined"
                    defaultValue={name}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 19 }}
                    onChange={(e) => this.setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id={date != null ? date.toString() : "date"}
                    label="Date"
                    type="date"
                    defaultValue={
                      date != null
                        ? date
                        : format(this.state.selectedDate, "yyyy-MM-dd")
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => this.setDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id={description}
                    label="Description"
                    variant="outlined"
                    defaultValue={description}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 45 }}
                    onChange={(e) => this.setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id={
                      startTime != null
                        ? format(startTime, "HH:mm")
                        : "startTime"
                    }
                    type="time"
                    label="Start Time"
                    defaultValue={
                      startTime != null ? format(startTime, "HH:mm") : "00:00"
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={(e) => this.setStartTime(e.target.value, date)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id={endTime != null ? format(endTime, "HH:mm") : "endTime"}
                    type="time"
                    label="End Time"
                    defaultValue={
                      endTime != null ? format(endTime, "HH:mm") : "00:30"
                    }
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={(e) => this.setEndTime(e.target.value, date)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id={place != null ? place : "place"}
                    select
                    label="Place"
                    defaultValue={place != null ? place : ""}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => this.setPlace(e.target.value)}
                  >
                    {this.state.cities.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option._id}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={color != null ? color : "color"}
                    select
                    label="Color"
                    defaultValue={color != null ? color : "Chartreuse"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => this.setColor(e.target.value)}
                  >
                    {this.state.colors.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option._id}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={_id ? 6 : 12}>
                  <center>
                    <Button type="submit" variant="contained" color="primary">
                      Save Event Data
                    </Button>
                  </center>
                </Grid>
                {_id && (
                  <Grid item xs={6}>
                    <center>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.deleteEvent}
                      >
                        Delete Event Data
                      </Button>
                    </center>
                  </Grid>
                )}
              </Grid>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddEventModal;
