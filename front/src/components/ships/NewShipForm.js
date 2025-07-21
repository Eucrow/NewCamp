import React, { Component } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import { preventNegativeE } from "../../utils/dataUtils";

import ShipButtonBar from "./ShipButtonBar";

/**
 * Ship component
 */
class NewShipForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ship: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static contextType = ShipsContext;

  /**
   * Manage fields change in 'ship' state.
   * @param {event} e - Event.
   */
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      ship: {
        ...this.state.ship,
        [name]: value,
      },
    });
  }

  renderContent() {
    const currentYear = new Date().getFullYear();

    const content = (
      <form
        className="wrapper"
        onSubmit={e => {
          this.context.createShip(e, this.state.ship);
          this.context.setAdding(false);
        }}
      >
        <div className="form__row">
          <span className="field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="survey_description"
              required
              size={30}
              autoFocus
              onChange={this.handleChange}
            />
          </span>
        </div>
        <div className="form__row">
          <span className="field">
            <label htmlFor="datras_id">DATRAS code:</label>
            <input
              type="text"
              id="datras_id"
              name="datras_id"
              size={4}
              maxLength={4}
              pattern="^\w{2,4}$"
              onChange={this.handleChange}
              title="Only letters and numbers, max 4 characters."
            />
          </span>
          <span className="field">
            <label htmlFor="length">Length (m):</label>
            <input
              type="number"
              id="length"
              name="length"
              min={0}
              max={999.99}
              size={5}
              step={0.01}
              onChange={this.handleChange}
              onKeyDown={preventNegativeE}
              title="Only positive numbers, max 999.99."
            />
          </span>
          <span className="field">
            <label htmlFor="beam">Beam (m):</label>
            <input
              type="number"
              id="beam"
              name="beam"
              min={0}
              max={99.99}
              size={4}
              step={0.01}
              onChange={this.handleChange}
              onKeyDown={preventNegativeE}
              title="Only positive numbers, max 99.99."
            />
          </span>
          <span className="field">
            <label htmlFor="main_power">Main power (kW):</label>
            <input
              type="number"
              id="main_power"
              name="main_power"
              min={0}
              max={9999}
              size={4}
              onChange={this.handleChange}
              onKeyDown={preventNegativeE}
              title="Only positive numbers, max 9999."
            />
          </span>
          <span className="field">
            <label htmlFor="year_built">Year built:</label>
            <input
              type="number"
              id="year_built"
              name="year_built"
              min={1900}
              max={currentYear}
              size={4}
              onChange={this.handleChange}
              onKeyDown={preventNegativeE}
              title={`Only positive numbers, from 1900 to ${currentYear}.`}
            />
          </span>
        </div>
        <div className="form__row">
          <span className="field__comment">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              className="comment"
              size={500}
              onChange={this.handleChange}
            ></textarea>
          </span>
        </div>
        <div className="form__row">
          <div className="survey__cell survey__cell--right buttonsWrapper">
            <ShipButtonBar adding={true} />
          </div>
        </div>
      </form>
    );

    return content;
  }

  render() {
    return this.renderContent();
  }
}

export default NewShipForm;
