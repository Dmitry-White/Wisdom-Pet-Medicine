import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
  getDeleteButton = (item) => (
    <div className="mr-3">
      <button
        className="pet-delete btn btn-sm btn-danger"
        onClick={() => this.props.deleteAppointment(item)}
      >
        <FaTimes />
      </button>
    </div>
  );

  getNotes = (item) => (
    <div
      className="apt-notes"
      contentEditable
      suppressContentEditableWarning
      onBlur={e =>
        this.props.updateInfo(
          'aptNotes',
          e.target.innerText,
          item.aptId
        )
      }
    >
      {item.aptNotes}
    </div>
  );

  getOwner = (item) => (
    <div className="owner-name">
      <span className="label-item">Owner: </span>
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={e =>
          this.props.updateInfo(
            'ownerName',
            e.target.innerText,
            item.aptId
          )
        }
      >
        {item.ownerName}
      </span>
    </div>
  );

  updateTitle = (e, item) => this.props.updateInfo(
    'petName',
    e.target.innerText,
    item.aptId
  );

  getTitle = (item) => (
    <div className="pet-head d-flex">
      <span
        className="pet-name"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => this.updateTitle(e, item)}
      >
        {item.aptId}--{item.petName}
      </span>
      <span className="apt-date ml-auto">
        <Moment
          date={item.aptDate}
          parse="YYYY-MM-dd hh:mm"
          format="MMM-d h:mma"
        />
      </span>
    </div>
  )

  getAppointmentContent = (item) => (
    <div className="pet-info media-body">
      {this.getTitle(item)}
      {this.getOwner(item)}
      {this.getNotes(item)}
    </div>
  )

  getAppointment = (item) => {
    return (
      <div className="pet-item col media py-3" key={item.aptId}>
        {this.getDeleteButton(item)}
        {this.getAppointmentContent(item)}
      </div>
    )
  }

  listAppointments = () => this.props.appointments.map(this.getAppointment);

  render() {
    return (
      <div className="appointment-list item-list mb-3">
        {this.listAppointments()}
      </div>
    );
  }
}

export default ListAppointments;
