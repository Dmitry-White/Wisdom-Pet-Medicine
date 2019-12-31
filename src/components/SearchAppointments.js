import React, { Component } from 'react';

const byButtons = [
  {
    fieldName: 'petName',
    text: 'Pet Name'
  },
  {
    fieldName: 'aptDate',
    text: 'Date'
  },
  {
    fieldName: 'ownerName',
    text: 'Owner'
  }
];

const dirButtons = [
  {
    fieldName: 'asc',
    text: 'Asc'
  },
  {
    fieldName: 'desc',
    text: 'Desc'
  }
];

class SearchAppointments extends Component {
  getButton = ({ text, isActive, clickHandler }) => (
    <button
      href="#"
      key={text}
      className={`sort-by dropdown-item ${isActive}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );

  getButtons = (buttons, type) => buttons.map(({ fieldName, text }) => {
    const { orderBy, orderDir, changeOrder } = this.props;

    const params = type === 'By'
      ? {
        text,
        isActive: orderBy === fieldName ? 'active' : '',
        clickHandler: () => changeOrder(fieldName, orderDir)
      }
      : {
        text,
        isActive: orderDir === fieldName ? 'active' : '',
        clickHandler: () => changeOrder(orderBy, fieldName)
      }

    return this.getButton(params);
  }
  );

  getSortBy = () => (
    <div className="input-group-append">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Sort by: <span className="caret" />
      </button>

      <div className="sort-menu dropdown-menu dropdown-menu-right">
        {this.getButtons(byButtons, 'By')}

        <div role="separator" className="dropdown-divider" />

        {this.getButtons(dirButtons)}
      </div>
    </div>
  )

  render() {
    const { searchApts } = this.props;

    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={searchApts}
            />
            {this.getSortBy()}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchAppointments;
