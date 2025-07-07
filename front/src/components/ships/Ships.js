import React, { Component } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import ShipsContext from "../../contexts/ShipsContext";

import ShipsButtonBar from "./ShipsButtonBar";
import NewShipForm from "./NewShipForm";
import Ship from "./Ship";

/**
 * Component list of ships.
 * List of all the ships stored in database.
 */
class Ships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ships: [],
      add: false, // true to add new ship; false to not to.
    };

    this.apiShip = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SHIPS);

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.createShip = this.createShip.bind(this);
    this.updateShip = this.updateShip.bind(this);
    this.deleteShip = this.deleteShip.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  /**
   * Manage change in fields
   * @param {event} e - Event.
   * @param {numeric} ship_id - Identification number of the ship which fields are managed.
   */
  handleChange(e, ship_id) {
    const name = e.target.name;
    const value = e.target.value;

    e.preventDefault();
    const newShips = this.state.ships.map(ship => {
      if (ship.id === ship_id) {
        var newShip = ship;
        newShip[name] = value;
        return newShip;
      } else {
        return ship;
      }
    });

    this.setState(() => {
      return {
        ships: newShips,
      };
    });
  }

  /**
   * Manage change of 'add' state.
   * @param {boolean} status - Identification number of the ship which fields are managed.
   */
  handleAdd(status) {
    this.setState(() => {
      return {
        add: status,
      };
    });
  }

  /**
   * Create ship in database and update the state.
   * @param {event} e - Event
   * @param {object} ship - Ship object to create.
   */
  createShip(e, ship) {
    e.preventDefault();

    fetch(this.apiShip, {
      method: "POST",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(ship),
    })
      .then(response => {
        return response.json();
      })
      .then(ship => {
        const newShips = [...this.state.ships, ship];

        this.setState({
          ships: newShips,
        });
      })
      .catch(error => alert(error));
  }

  /**
   * Update ship from database and state.
   * @param {event} e - Event.
   * @param {numeric} ship_id - Ship identificator of ship to update.
   */
  updateShip(e, ship_id) {
    e.preventDefault();
    const api = this.apiShip + ship_id;

    const updatedShip = this.state.ships.filter(ship => {
      return ship.id === ship_id;
    });

    fetch(api, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(updatedShip[0]),
    })
      .then(response => {
        if (response.status === 200) {
          this.handleEdit(null);
        } else {
          alert("Something is wrong.");
        }
      })
      .catch(error => console.log(error));
  }

  /**
   * Delete ship from database and state.
   * @param {event} e Event.
   * @param {numeric} ship_id Ship identificator of ship to delete.
   */
  deleteShip(ship_id) {
    const api = this.apiShip + ship_id;

    fetch(api, {
      method: "DELETE",
      headers: API_CONFIG.HEADERS.DEFAULT,
    })
      .then(() => {
        const newShips = this.state.ships.filter(ship => ship.id !== ship_id);

        this.setState({
          ships: newShips,
        });
      })
      .catch(error => alert(error));
  }

  // VALIDATIONS
  /**
   * Prevent 'e' and '-' in numeric input
   * @param {e} onKeyDown event
   */
  preventNegativeE(e) {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  }

  /**
   * Create content to render.
   * @private
   */
  renderContent() {
    let content = "";

    content = (
      <ShipsContext.Provider
        value={{
          handleChange: this.handleChange,
          handleAdd: this.handleAdd,
          createShip: this.createShip,
          updateShip: this.updateShip,
          deleteShip: this.deleteShip,
          preventNegativeE: this.preventNegativeE,
        }}
      >
        <main>
          <header>
            <h1 className="title">Ships</h1>
          </header>
          <div className="wrapper surveysWrapper">
            <ShipsButtonBar add={this.state.add} handleAdd={this.handleAdd} />

            {this.state.add === true ? <NewShipForm /> : ""}

            {this.state.ships.map(ship => {
              return <Ship key={ship.id} ship={ship} />;
            })}
          </div>
        </main>
      </ShipsContext.Provider>
    );

    return content;
  }

  componentDidMount() {
    // Fetch ships
    fetch(this.apiShip)
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(ships => {
        this.setState(() => {
          return { ships };
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return this.renderContent();
  }
}

export default Ships;
