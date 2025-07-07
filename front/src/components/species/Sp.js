import React, { Component } from "react";

import ViewEditSpForm from "./ViewEditSpForm";

class Sp extends Component {
  /**
   * Sp component.
   * @param {object} props.sp
   * @param {method} props.handleChange
   * @param {method} props.handleUpdateSp
   */
  constructor(props) {
    super(props);
    this.state = {
      detail: false,
      edit: false,
    };

    this.changeDetail = this.changeDetail.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  changeDetail(detail) {
    this.setState(() => {
      return {
        detail: detail,
      };
    });
  }

  handleEdit(edit) {
    this.setState(() => {
      return {
        edit: edit,
      };
    });
  }

  renderContent() {
    if (this.state.detail === false) {
      return (
        <div key={this.props.sp.id} className="wrapper">
          <div className="form__row">
            <span className="field">Group: {this.props.sp.group}</span>
            <span className="field">Code: {this.props.sp.sp_code}</span>
            <span className="field">
              Scientific Name: {this.props.sp.sp_name}
            </span>

            <span className="form__cell form__cell--right">
              <button
                onClick={() => {
                  this.changeDetail(true);
                }}
              >
                View Detail
              </button>
            </span>
          </div>
        </div>
      );
    } else if (this.state.detail === true) {
      if (this.state.edit === true) {
        return (
          <ViewEditSpForm
            sp={this.props.sp}
            edit={true}
            handleEdit={this.handleEdit}
          />
        );
      } else {
        return (
          <div>
            <ViewEditSpForm
              sp={this.props.sp}
              edit={false}
              changeDetail={this.changeDetail}
              handleEdit={this.handleEdit}
            />
          </div>
        );
      }
    }
  }

  render() {
    return this.renderContent();
  }
}

export default Sp;
