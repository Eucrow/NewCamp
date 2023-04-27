import React, { useState } from "react";
import HaulFormView from "./view/HaulFormView";
import HaulFormEdit from "./edit/HaulFormEdit";
import HaulDetails from "./HaulDetails";
import ComponentsTrawlCatches from "../trawlCatches/TrawlHaulCatches";

const Haul = (props) => {
	const [detail, setDetail] = useState(false);
	const [edit, setEdit] = useState(false);
	const [haul_status] = useState("view");

	const renderContent = () => {
		if (detail === false && edit === false) {
			return (
				<div className="wrapper form__row">
					<HaulFormView
						haul={props.haul}
						haul_status={haul_status}
						handleEdit={setEdit}
						handleDetail={setDetail}
					/>
					<ComponentsTrawlCatches haul_id={props.haul.id} />
				</div>
			);
		} else if (detail === false && edit === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormEdit
						haul={props.haul}
						station_id={props.station_id}
						edit={edit}
						handleEdit={setEdit}
						samplers={props.samplers}
					/>
					<ComponentsTrawlCatches haul_id={props.haul.id} />
				</div>
			);
		} else if (detail === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormView haul={props.haul} />
					<HaulDetails
						haul={props.haul}
						handleDetail={setDetail}
						validateHaulSampler={props.validateHaulSampler}
					/>
					<ComponentsTrawlCatches haul_id={props.haul.id} />
				</div>
			);
		}
	};

	return renderContent();
};

export default Haul;
