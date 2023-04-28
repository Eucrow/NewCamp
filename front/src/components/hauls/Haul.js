import React, { useState } from "react";
import HaulFormView from "./view/HaulFormView";
import HaulFormEdit from "./edit/HaulFormEdit";
import HaulDetails from "./HaulDetails";
import ComponentsTrawlCatches from "../trawlCatches/TrawlHaulCatches";

const Haul = ({ haul, station_id, samplers, validateHaulSampler }) => {
	const [detail, setDetail] = useState(false);
	const [edit, setEdit] = useState(false);
	const [haul_status] = useState("view");

	const renderContent = () => {
		if (detail === false && edit === false) {
			return (
				<div className="wrapper form__row">
					<HaulFormView
						haul={haul}
						detail={detail}
						haul_status={haul_status}
						handleEdit={setEdit}
						handleDetail={setDetail}
					/>
					<ComponentsTrawlCatches haul_id={haul.id} />
				</div>
			);
		} else if (detail === false && edit === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormEdit
						haul={haul}
						station_id={station_id}
						edit={edit}
						handleEdit={setEdit}
						samplers={samplers}
					/>
					<ComponentsTrawlCatches haul_id={haul.id} />
				</div>
			);
		} else if (detail === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormView haul={haul} />
					<HaulDetails haul={haul} handleDetail={setDetail} validateHaulSampler={validateHaulSampler} />
					<ComponentsTrawlCatches haul_id={haul.id} />
				</div>
			);
		}
	};

	return renderContent();
};

export default Haul;
