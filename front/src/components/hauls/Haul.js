import React, { useState, useContext } from "react";
import HaulFormView from "./view/HaulFormView";
import HaulFormEdit from "./edit/HaulFormEdit";
import HaulDetails from "./HaulDetails";
import HaulHandleNew from "./new/HaulHandleNew";
import Catches from "../trawlCatches/Catches";

import StationsContext from "../../contexts/StationsContext";

const Haul = ({ haul, stationId, samplers, validateHaulSampler, haulRef, samplerRef, createHaul, add, handleAdd }) => {
	const stationsContext = useContext(StationsContext);
	const [catchesMode, setCatchesMode] = useState(false);
	const [detail, setDetail] = useState(false);
	const [edit, setEdit] = useState(false);

	const [thisHaul, setThisHaul] = useState(haul);

	const haulConfig = {
		defaultMode: (
			<div className="wrapper form__row">
				<HaulFormView
					haul={haul}
					detail={detail}
					setEdit={setEdit}
					setDetail={setDetail}
					setCatchesMode={setCatchesMode}
				/>
			</div>
		),
		addMode: (
			<div className="wrapper form__row">
				<HaulHandleNew
					station_id={stationId}
					handleAdd={handleAdd}
					createHaul={createHaul}
					validateHaulSampler={validateHaulSampler}
					haulRef={haulRef}
					samplerRef={samplerRef}
					setDetail={setDetail}
				/>
			</div>
		),
		editMode: (
			<div className="wrapper form__row">
				<HaulFormEdit
					thisHaul={thisHaul}
					setThisHaul={setThisHaul}
					station_id={stationId}
					edit={edit}
					setEdit={setEdit}
					samplers={samplers}
				/>
			</div>
		),
		detailMode: (
			<div className="wrapper form__row">
				<HaulFormView haul={haul} />
				<HaulDetails
					haul={haul}
					detail={detail}
					setDetail={setDetail}
					validateHaulSampler={validateHaulSampler}
				/>
			</div>
		),
		catchesMode: (
			<div className="wrapper form__row">
				<HaulFormView
					haul={haul}
					detail={detail}
					setDetail={setDetail}
					setEdit={setEdit}
					catchesMode={catchesMode}
					setCatchesMode={setCatchesMode}
					haul_id={haul.id}
					edit={false}
					deleteHaul={stationsContext.deleteHaul}
				/>

				<Catches haul_id={haul["id"]} />
			</div>
		),
	};

	let currentMode;

	if (add === true) {
		currentMode = "addMode";
	} else if (detail === true) {
		currentMode = "detailMode";
	} else if (haul.sampler_id === 1 && catchesMode === true) {
		currentMode = "catchesMode";
	} else if (edit === true) {
		currentMode = "editMode";
	} else {
		currentMode = "defaultMode";
	}

	const haulContent = haulConfig[currentMode];

	return haulContent;
};

export default Haul;
