import React, { useContext } from "react";

import HaulButtonBar from "../HaulButtonBar";

import StationsContext from "../../../contexts/StationsContext";

const HaulFormView = ({ haul, detail, setEdit, setDetail, catchesMode, setCatchesMode }) => {
	const stationsContext = useContext(StationsContext);

	const renderContent = () => {
		return (
			<form className="form__row form--wide">
				<label className="form__cell">
					Haul:
					<input
						type="number"
						name="haul"
						id="haul"
						className="input__noSpinner"
						disabled
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={haul.haul}
					/>
				</label>

				<label className="form__cell">
					Stratum:
					<select id="stratum_id" name="stratum_id" className="select__largeWidth" disabled>
						<option value={haul.stratum_id}>{haul.stratum}</option>
					</select>
				</label>

				<label className="form__cell">
					Sampler:
					<select id="sampler_id" name="sampler" className="select__normalWidth" disabled>
						<option value={haul.sampler_id}>{haul.sampler}</option>
					</select>
				</label>

				<label className="form__cell">
					Gear:
					<select id="gear_id" name="gear" className="select__gear" disabled>
						<option value={haul.gear}>{haul.gear}</option>
					</select>
				</label>

				<label className="form__cell">
					Valid:
					<input type="checkbox" name="valid" id="valid" disabled defaultChecked={haul.valid} />
				</label>

				<HaulButtonBar
					haul_id={haul.id}
					edit={false}
					detail={detail}
					setEdit={setEdit}
					setDetail={setDetail}
					deleteHaul={stationsContext.deleteHaul}
					catchesMode={catchesMode}
					setCatchesMode={setCatchesMode}
				/>
			</form>
		);
	};

	return renderContent();
};

export default HaulFormView;
