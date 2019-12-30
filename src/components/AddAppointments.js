import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddAppointments extends Component {
  state = {
    petName: '',
    ownerName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: ''
  };

  handleAdd = (e) => {
    e.preventDefault();

    const { petName, ownerName, aptDate, aptTime, aptNotes } = this.state;
    const { addAppointment, toggleForm } = this.props;

    const tempApt = {
      petName,
      ownerName,
      aptDate: aptDate + ' ' + aptTime,
      aptNotes
    };

    addAppointment(tempApt);

    this.setState({
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: ''
    });
    toggleForm();
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  }

  getLabel = ({ fieldName, label }) => (
    <label
      className="col-md-2 col-form-label text-md-right"
      htmlFor={fieldName}
      readOnly
    >
      {label}
    </label>
  );

  getInput = ({ type, fieldName, placeholder }) => (
    <div className="col-md-10">
      {type === 'textarea'
        ? (
          <textarea
            className="form-control"
            rows="4"
            cols="50"
            name={fieldName}
            id={fieldName}
            placeholder={placeholder}
            value={this.state[fieldName]}
            onChange={this.handleChange}
          />
        )
        : (
          <input
            type={type}
            className="form-control"
            name={fieldName}
            id={fieldName}
            placeholder={placeholder}
            value={this.state[fieldName]}
            onChange={this.handleChange}
          />
        )}
    </div>
  );

  getField = ({ type, label, fieldName, placeholder }) => (
    <div className="form-group form-row" key={fieldName}>
      {this.getLabel({ fieldName, label })}
      {this.getInput({ type, fieldName, placeholder })}
    </div>
  );

  getFields = (fields) => fields.map(this.getField);

  getAddButton = (
    <div className="form-group form-row mb-0">
      <div className="offset-md-2 col-md-10">
        <button
          type="submit"
          className="btn btn-primary d-block ml-auto"
        >
          Add Appointment
        </button>
      </div>
    </div>
  )

  getAppointmentForm = () => (
    <div className="card-body">
      <form id="aptForm" noValidate onSubmit={this.handleAdd}>
        {this.getFields([
          {
            type: 'text',
            label: 'Pet Name',
            fieldName: 'petName',
            placeholder: "Pet's Name"
          },
          {
            type: 'text',
            label: 'Pet Owner',
            fieldName: 'ownerName',
            placeholder: "Owner's Name"
          },
          {
            type: 'date',
            label: 'Date',
            fieldName: 'aptDate',
          },
          {
            type: 'time',
            label: 'Time',
            fieldName: 'aptTime',
          },
          {
            type: 'textarea',
            label: 'Apt. Notes',
            fieldName: 'aptNotes',
            placeholder: 'Appointment Notes'
          }
        ])}

        {this.getAddButton}
      </form>
    </div>
  );

  render() {
    const { formDisplay, toggleForm } = this.props;

    return (
      <div className={'card textcenter mt-3 ' + (formDisplay ? '' : 'add-appointment')}>
        <div
          className="apt-addheading card-header bg-primary text-white"
          onClick={toggleForm}
        >
          <FaPlus /> Add Appointment
        </div>
        {this.getAppointmentForm()}
      </div>
    );
  }
}

export default AddAppointments;
