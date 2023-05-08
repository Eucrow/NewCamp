import React, { useContext } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulButtonBar from "../HaulButtonBar";

const HaulFormEdit = ({ haul, station_id, edit, setEdit, handleChangeNestedIds }) => {
	/**
	 * @param {object} haul
	 * @param {number} station_id
	 * @param {boolean} edit
	 * @param {method} handleChangeCommonValid
	 * @param {method} handleChangeNestedIds
	 * @param {method} validateHaulSampler
	 * @returns {JSX.Element}
	 *  */

	const stationsContext = useContext(StationsContext);

	const handleSubmit = (e, haul_id, station_id) => {
		stationsContext.updateHaulCommon(e, haul_id, station_id);
		setEdit(false);
	};

	const renderContent = () => {
		return (
			<form className="form__row form--wide" onSubmit={(e) => handleSubmit(e, haul.id, station_id)}>
				<label className="form__cell">
					Haul:
					<input
						type="number"
						name="haul"
						id="haul"
						className="input__noSpinner"
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={haul.haul || ""}
						onChange={(e) => {
							stationsContext.handleChangeCommonHaul(e, haul.id);
						}}
					/>
				</label>
				<label className="form__cell">
					Stratum:
					<select
						id="stratum_id"
						name="stratum_id"
						className="select__largeWidth"
						value={haul.stratum_id || "choose"}
						onChange={(e) => {
							stationsContext.handleChangeStratum(e, haul.id);
						}}
					>
						{stationsContext.strata.map((stratum) => {
							return (
								<option key={stratum.id} value={stratum.id}>
									{stratum.stratum}
								</option>
							);
						})}
					</select>
				</label>
				<label className="form__cell">
					Sampler:
					<select
						id="sampler_id"
						name="sampler"
						className="select__normalWidth"
						disabled
						value={haul.sampler_id || "choose"}
						onChange={handleChangeNestedIds}
					>
						{stationsContext.samplers.map((sampler) => {
							return (
								<option key={sampler.id} value={sampler.id}>
									{sampler.sampler}
								</option>
							);
						})}
					</select>
				</label>
				<label className="form__cell">
					Gear:
					<select
						id="gear_id"
						name="gear"
						className="select__gear"
						value={haul.gear_id || "choose"}
						onChange={(e) => {
							stationsContext.handleChangeGear(e, haul.id);
						}}
					>
						{stationsContext.gears.map((gear) => {
							return (
								<option key={gear.id} value={gear.id}>
									{gear.name}
								</option>
							);
						})}
					</select>
				</label>
				<label className="form__cell">
					Valid:
					<input
						type="checkbox"
						name="valid"
						id="valid"
						defaultChecked={haul.valid}
						onChange={(e) => {
							stationsContext.handleChangeCommonValid(haul.id);
						}}
					/>
				</label>

				<HaulButtonBar
					haul_id={haul.id}
					edit={edit}
					setEdit={setEdit}
					deleteHaul={stationsContext.deleteHaul}
				/>
			</form>
		);
	};

	return renderContent();
};

// class EditCommonForm extends Component {
// 	/**
// 	 * Component of the common part of the haul form.
// 	 * @param {object} haul
// 	 * @param {number} station_id
// 	 * @param {boolean} edit
// 	 * @param {method} handleChangeCommonValid
// 	 * @param {method} handleChangeNestedIds
// 	 * @param {method} validateHaulSampler
// 	 */

// 	constructor(props) {
// 		super(props);

// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	static contextType = StationsContext;

// 	handleSubmit(e, haul_id, station_id) {
// 		stationsContext.updateHaulCommon(e, haul_id, station_id);
// 		setEdit(false);
// 	}

// 	render() {
// 		const haul = haul;

// 		return (
// 			<form
// 				className="form__row form--wide"
// 				onSubmit={(e) => this.handleSubmit(e, haul.id, station_id)}
// 			>
// 				<label className="form__cell">
// 					Haul:
// 					<input
// 						type="number"
// 						name="haul"
// 						id="haul"
// 						className="input__noSpinner"
// 						min="1"
// 						max="99"
// 						maxLength="2"
// 						size={2}
// 						value={haul.haul || ""}
// 						onChange={(e) => {
// 							stationsContext.handleChangeCommonHaul(e, haul.id);
// 						}}
// 					/>
// 				</label>
// 				<label className="form__cell">
// 					Stratum:
// 					<select
// 						id="stratum_id"
// 						name="stratum_id"
// 						className="select__largeWidth"
// 						value={haul.stratum_id || "choose"}
// 						onChange={(e) => {
// 							stationsContext.handleChangeStratum(e, haul.id);
// 						}}
// 					>
// 						{stationsContext.strata.map((stratum) => {
// 							return (
// 								<option key={stratum.id} value={stratum.id}>
// 									{stratum.stratum}
// 								</option>
// 							);
// 						})}
// 					</select>
// 				</label>
// 				<label className="form__cell">
// 					Sampler:
// 					<select
// 						id="sampler_id"
// 						name="sampler"
// 						className="select__normalWidth"
// 						disabled
// 						value={haul.sampler_id || "choose"}
// 						onChange={handleChangeNestedIds}
// 					>
// 						{stationsContext.samplers.map((sampler) => {
// 							return (
// 								<option key={sampler.id} value={sampler.id}>
// 									{sampler.sampler}
// 								</option>
// 							);
// 						})}
// 					</select>
// 				</label>
// 				<label className="form__cell">
// 					Gear:
// 					<select
// 						id="gear_id"
// 						name="gear"
// 						className="select__gear"
// 						value={haul.gear_id || "choose"}
// 						onChange={(e) => {
// 							stationsContext.handleChangeGear(e, haul.id);
// 						}}
// 					>
// 						{stationsContext.gears.map((gear) => {
// 							return (
// 								<option key={gear.id} value={gear.id}>
// 									{gear.name}
// 								</option>
// 							);
// 						})}
// 					</select>
// 				</label>
// 				<label className="form__cell">
// 					Valid:
// 					<input
// 						type="checkbox"
// 						name="valid"
// 						id="valid"
// 						defaultChecked={haul.valid}
// 						onChange={(e) => {
// 							stationsContext.handleChangeCommonValid(haul.id);
// 						}}
// 					/>
// 				</label>

// 				<HaulButtonBar
// 					haul_id={haul.id}
// 					edit={edit}
// 					setEdit={setEdit}
// 					deleteHaul={stationsContext.deleteHaul}
// 				/>
// 			</form>
// 		);
// 	}
// }

export default HaulFormEdit;
