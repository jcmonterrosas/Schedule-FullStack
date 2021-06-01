import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import "./event.css";

export default class DayEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal || false,
      toggleModal: this.props.toggleModal,
      selectedDate: this.props.selectedDate,
      events: this.props.events,
      editEvent: this.props.editEvent
    };
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <Modal open={this.state.showModal} onClose={this.state.toggleModal}>
          <div className="paper add-event-modal" style={{ width: "35%" }}>
            <center>
              <h2 id="simple-modal-title">
                {"Events day " + this.state.selectedDate.getDate()}
              </h2>
            </center>{" "}
            <div>
              {events
                .sort((a, b) =>
                  a.startTime.getTime() > b.startTime.getTime() ? 1 : -1
                )
                .map((e, i) => (
                  <Grid
                    container
                    key={i}
                    style={{
                      backgroundColor: `${e.color}`
                    }}
                    className="day-events-modal"
                    onClick={() => this.state.editEvent(e)}
                  >
                    <Grid item xs container>
                      <Grid item xs={7}>
                        {e.name}
                      </Grid>
                      <Grid item xs>
                        {e.place}
                      </Grid>
                    </Grid>
                    <Grid item>
                      {format(e.startTime, "HH:mm aaa") +
                        " - " +
                        format(e.endTime, "HH:mm aaa")}
                    </Grid>
                    <Grid item xs={12}>
                      {e.description}
                    </Grid>
                    <Grid></Grid>
                  </Grid>
                ))}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
