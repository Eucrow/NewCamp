import React, { useState, useContext } from "react";
import HaulFormView from "./view/HaulFormView";
import HaulFormEdit from "./edit/HaulFormEdit";
import HaulDetails from "./HaulDetails";
import HaulHandleNew from "./new/HaulHandleNew";
import Catches from "../trawlCatches/Catches";

import StationsContext from "../../contexts/StationsContext";

const Haul = ({
	haul,
	stationId,
	samplers,
	validateHaulSampler,
	haulRef,
	samplerRef,
	createHaul,
	addHaul,
	handleAddHaul,
}) => {
	const stationsContext = useContext(StationsContext);
	const [catchesMode, setCatchesMode] = useState(false);
	const [detail, setDetail] = useState(false);
	const [edit, setEdit] = useState(false);

	const [thisHaul, setThisHaul] = useState(haul);

	const renderContent = () => {
		if (addHaul === true) {
			return (
				<div className="wrapper form__row">
					<HaulHandleNew
						station_id={stationId}
						handleAdd={handleAddHaul}
						createHaul={createHaul}
						validateHaulSampler={validateHaulSampler}
						haulRef={haulRef}
						samplerRef={samplerRef}
						setDetail={setDetail}
					/>
				</div>
			);
		} else if (detail === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormView haul={haul} detail={detail} setDetail={setDetail} />
					<HaulDetails haul={haul} detail={detail} setDetail={setDetail} />
				</div>
			);
		} else if (haul.sampler_id === 1 && catchesMode === true) {
			return (
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
			);
		} else if (edit === true) {
			return (
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
			);
		} else {
			return (
				<div className="wrapper form__row">
					<HaulFormView
						haul={haul}
						detail={detail}
						setEdit={setEdit}
						setDetail={setDetail}
						setCatchesMode={setCatchesMode}
					/>
				</div>
			);
		}
	};

	return renderContent();
};

export default Haul;
