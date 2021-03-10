import React, { Component, Fragment } from "react";

import NewMeteorology from "./NewMeteorology.js";
import NewHydrography from "./NewHydrography.js";
import NewTrawl from "./NewTrawl";

class NewSpecific extends Component {
	/**
	 * Component of the specific form: Hydrography or Trawl form.
	 * @param {numeric} props.sampler_id: sampler id.
	 * @param {method} props.handleChangeTrawl: function to manage the trawl handleChange event.
	 * @param {method} props.handleChangeHydrography: function to manage hydrography handleChange evet.
	 */

	render() {
		const sampler_id = this.props.sampler_id;
		if (sampler_id === "1") {
			return (
				<Fragment>
					<NewTrawl
						handleChangeTrawl={this.props.handleChangeTrawl}
					/>
					<NewMeteorology
						handleChangeMeteo={this.props.handleChangeMeteo}
					/>
				</Fragment>
			);
		} else if (sampler_id === "2") {
			return (
				<NewHydrography
					handleChangeHydrography={this.props.handleChangeHydrography}
				/>
			);
		} else {
			//TODO: return error message instead of null
			return null;
		}
	}
}

export default NewSpecific;
