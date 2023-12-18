import React, { useState } from "react";
import HaulFormView from "./view/HaulFormView";
import HaulFormEdit from "./edit/HaulFormEdit";
import HaulDetails from "./HaulDetails";
import HaulHandleNew from "./new/HaulHandleNew";
import Catches from "../trawlCatches/Catches";

const Haul = ({ haul, stationId, samplers, validateHaulSampler, haulRef, samplerRef, createHaul, add, handleAdd }) => {
	const [detail, setDetail] = useState(false);
	const [edit, setEdit] = useState(false);

	const [thisHaul, setThisHaul] = useState(haul);

	const renderContent = () => {
		if (add === true) {
			return (
				<>
					<HaulHandleNew
						station_id={stationId}
						handleAdd={handleAdd}
						createHaul={createHaul}
						validateHaulSampler={validateHaulSampler}
						haulRef={haulRef}
						samplerRef={samplerRef}
						setDetail={setDetail}
					/>
				</>
			);
		}

		if (detail === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormView haul={haul} />
					<HaulDetails
						haul={haul}
						detail={detail}
						setDetail={setDetail}
						validateHaulSampler={validateHaulSampler}
					/>
					<Catches haul_id={haul["id"]} />
				</div>
			);
		}

		if (edit === false) {
			if (haul.sampler_id === 1) {
				return (
					<div className="wrapper form__row">
						<HaulFormView haul={haul} detail={detail} setEdit={setEdit} setDetail={setDetail} />
						<Catches haul_id={haul["id"]} />
					</div>
				);
			} else {
				return (
					<div className="wrapper form__row">
						<HaulFormView haul={haul} detail={detail} setEdit={setEdit} setDetail={setDetail} />
					</div>
				);
			}
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
		}
	};

	return renderContent();
};

export default Haul;
