import React, { Fragment } from "react";

import MeteorologyFormNew from "./MeteorologyFormNew.js";
import HydrographyFormNew from "./HydrographyFormNew.js";
import TrawlFormNew from "./TrawlFormNew.js";

const HandleHaulType = (sampler_id, handleChangeTrawl, handleChangeHydrography) => {
	/**
	 * Component of the specific form: Hydrography or Trawl form.
	 * @param {numeric} sampler_id: sampler id.
	 * @param {method} handleChangeTrawl: function to manage the trawl handleChange event.
	 * @param {method} handleChangeHydrography: function to manage hydrography handleChange evet.
	 */

	const renderContent = () => {
		const sampler_id = this.props.sampler_id;
		if (sampler_id === "1") {
			return (
				<Fragment>
					<MeteorologyFormNew handleChangeMeteo={this.props.handleChangeMeteo} />
					<TrawlFormNew handleChangeTrawl={this.props.handleChangeTrawl} />
				</Fragment>
			);
		} else if (sampler_id === "2") {
			return <HydrographyFormNew handleChangeHydrography={this.props.handleChangeHydrography} />;
		} else {
			//TODO: return error message instead of null
			return null;
		}
	};

	return renderContent();
};

export default HandleHaulType;
