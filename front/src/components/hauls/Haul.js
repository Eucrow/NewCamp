import React, { useState } from "react";
import HaulFormView from "./view/HaulFormView";
import HaulFormEdit from "./edit/HaulFormEdit";
import HaulDetails from "./HaulDetails";
import HaulHandleNew from "./new/HaulHandleNew";
import TrawlHaulCatches from "../trawlCatches/TrawlHaulCatches";

const Haul = ({ haul, station_id, samplers, validateHaulSampler, haulRef, samplerRef, createHaul, add, handleAdd }) => {
	const [detail, setDetail] = useState(false);
	const [edit, setEdit] = useState(false);

	const renderContent = () => {
		if (add === true) {
			return (
				<>
					<HaulHandleNew
						station_id={station_id}
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
					{/* <HaulDetails
						haul={haul}
						detail={detail}
						setDetail={setDetail}
						validateHaulSampler={validateHaulSampler}
					/> */}
				</div>
			);
		}

		if (edit === false) {
			return (
				<div className="wrapper form__row">
					<HaulFormView haul={haul} detail={detail} setEdit={setEdit} setDetail={setDetail} />
				</div>
			);
		} else if (edit === true) {
			return (
				<div className="wrapper form__row">
					<HaulFormEdit
						haul={haul}
						station_id={station_id}
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
