import React, { Component } from "react";
import EditSp from "./EditSp";

import ViewSp from "./ViewSp";

class Sp extends Component {
	/**
	 * Sp component.
	 * @param {object} props.sp
	 * @param {method} props.handleChange
	 */
	constructor(props) {
		super(props);
		this.state = {
			detail: false,
			edit: false,
		};

		this.changeDetail = this.changeDetail.bind(this);
		this.changeEdit = this.changeEdit.bind(this);
	}

	changeDetail(detail) {
		this.setState(() => {
			return {
				detail: detail,
			};
		});
	}

	changeEdit(edit) {
		this.setState(() => {
			return {
				edit: edit,
			};
		});
	}

	renderContent() {
		const sp = this.props.sp;

		if (this.state.detail === false) {
			return (
				<div key={sp.id} className="wrapper">
					Group: {sp.group} Code: {sp.sp_code} Scientific Name:{" "}
					{sp.sp_name}
					<button
						onClick={() => {
							this.changeDetail(true);
						}}
					>
						View
					</button>
				</div>
			);
		} else if (this.state.detail === true) {
			if (this.state.edit === true) {
				return (
					<EditSp
						sp={sp}
						handleChange={this.props.handleChange}
						handleUpdateSp={this.props.handleUpdateSp}
						changeEdit={this.changeEdit}
					/>
				);
			} else {
				return (
					<div>
						<ViewSp sp={sp} changeDetail={this.changeDetail} />
						<button
							onClick={() => {
								this.changeEdit(true);
							}}
						>
							Edit
						</button>
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
