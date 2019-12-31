import React, { Component } from 'react';
import { findIndex, without } from 'lodash';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import '../css/App.css';

class App extends Component {
  state = {
    myAppointments: [],
    formDisplay: false,
    orderBy: 'petName',
    orderDir: 'asc',
    queryText: '',
    lastIndex: 0
  };

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts
        });
      });
  }

  toggleForm = () => this.setState({ formDisplay: !this.state.formDisplay });

  searchApts = (e) => this.setState({ queryText: e.target.value });

  changeOrder = (orderBy, orderDir) => this.setState({ orderBy, orderDir });

  updateInfo = (name, value, aptId) => {
    const { myAppointments } = this.state;

    const aptIndex = findIndex(myAppointments, { aptId });
    myAppointments[aptIndex][name] = value;

    this.setState({ myAppointments });
  }

  addAppointment = (apt) => {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteAppointment = (apt) => {
    const { myAppointments } = this.state;

    this.setState({
      myAppointments: without(myAppointments, apt)
    });
  }

  getOrderSorter = (a, b) => {
    const { orderDir, orderBy } = this.state;
    const order = orderDir === 'asc' ? 1 : -1;

    return (a[orderBy].toLowerCase() <
      b[orderBy].toLowerCase()) ? -1 * order : 1 * order;
  }

  getFilter = (item) => {
    const { queryText } = this.state;
    return (
      item['petName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
      item['ownerName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
      item['aptNotes']
        .toLowerCase()
        .includes(queryText.toLowerCase())
    );
  }

  getFilteredAppointments = () => {
    const { myAppointments } = this.state;

    return myAppointments
      .sort(this.getOrderSorter)
      .filter(this.getFilter);
  }

  render() {
    const { orderDir, orderBy, formDisplay } = this.state;

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments
                  orderBy={orderBy}
                  orderDir={orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments
                  appointments={this.getFilteredAppointments()}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
