import React, { useEffect, useState, useContext } from "react";
import CatchButtonBar from "./CatchButtonBar";
import SpeciesContext from "../../contexts/SpeciesContext";

/**
 * CatchForm is a functional component that represents a form for managing catch data.
 *
 * @component
 * @param {string} catchStatus - The current status of the catch: "", "view" or "edit".
 * @param {object} thisCatch - The catch object that is currently being managed by this component.
 * @param {object} species - An object containing species data.
 * @param {function} createCatch - A function to create a new catch in the database.
 * @param {function} handleChangeGroup - A function to handle changes to the group field.
 * @param {function} handleChangeSpecies - A function to handle changes to the species field.
 * @param {function} handleChangeCategory - A function to handle changes to the category field.
 * @param {function} handleChangeWeight - A function to handle changes to the weight field.
 * @param {function} handleChangeSampledWeight - A function to handle changes to the sampled_weight field.
 * @param {function} updateCatch - A function to update the catch in the database.
 * @param {function} editCatchStatus - A function to manage the catchStatus state.
 * @param {string} catchId - The id of the catch.
 * @param {boolean} viewSexes - A boolean to manage the view of sexes.
 * @param {function} handleCancel - A function to handle cancel action.
 * @param {function} deleteCatch - A function to delete the catch from the database.
 * @param {function} handleViewSexes - A function to handle the view of sexes.
 * @param {function} handleChangeAdd - A function to handle changes to the add field.
 * @returns {JSX.Element} The rendered Catch component.
 */
const CatchForm = ({
	catchStatus,
	thisCatch,
	createCatch,
	handleChangeGroup,
	handleChangeSpecies,
	handleChangeCategory,
	handleChangeWeight,
	handleChangeSampledWeight,
	updateCatch,
	editCatchStatus,
	catchId,
	viewSexes,
	handleCancel,
	deleteCatch,
	handleViewSexes,
	handleChangeAdd,
}) => {
	const [group, setGroup] = useState("");
	const [sp_id, setSp_id] = useState("");
	const [category, setCategory] = useState("");
	const [weight, setWeight] = useState("");
	const [sampled_weight, setSampled_weight] = useState("");
	const [new_catch, setNew_catch] = useState({ group, sp_id, category, weight });
	const speciesContext = useContext(SpeciesContext);

	useEffect(() => {
		setNew_catch({ group, sp_id, category, weight, sampled_weight });
	}, [group, sp_id, category, weight, sampled_weight]);

	const renderContent = () => {
		if (catchStatus === "add") {
			return (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						createCatch(new_catch);
					}}
				>
					<label className="form__cell">
						Group:
						<input
							value={group}
							style={{ width: 5 + "ch" }}
							autoFocus
							type="number"
							id="group"
							name="group"
							min="1"
							max="5"
							onChange={(e) => setGroup(e.target.value)}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select
							style={{ width: 30 + "ch" }}
							id="sp_code"
							name="sp_code"
							onChange={(e) => setSp_id(e.target.value)}
						>
							<option>Select species...</option>
							{speciesContext.species.map((s) => {
								if (s.group === parseInt(group)) {
									return (
										<option value={s.id} key={s.id}>
											{s.sp_code}-{s.sp_name}
										</option>
									);
								} else {
									return null;
								}
							})}
						</select>
					</label>
					<label className="form__cell">
						Category:
						<input
							value={category}
							style={{ width: 4 + "ch" }}
							type="number"
							id="category"
							name="category"
							min="1"
							max="99"
							onChange={(e) => setCategory(e.target.value)}
						/>
					</label>
					<label className="form__cell">
						Weight(g.):
						<input
							value={weight}
							style={{ width: 8 + "ch" }}
							type="number"
							id="weight"
							name="weight"
							min="1"
							max="99999999"
							onChange={(e) => setWeight(e.target.value)}
						/>
					</label>
					<label className="form__cell">
						Sampled weight(g.):
						<input
							style={{ width: 8 + "ch" }}
							type="number"
							id="sampled_weight"
							name="sampled_weight"
							min="1"
							max="99999999"
							onChange={(e) => setSampled_weight(e.target.value)}
						/>
					</label>
					<CatchButtonBar catchStatus={"add"} handleChangeAdd={handleChangeAdd} />
				</form>
			);
		} else if (catchStatus === "view" || catchStatus === "") {
			return (
				<form className="form__cell">
					<label className="form__cell">
						Group:
						<input
							style={{ width: 5 + "ch" }}
							type="number"
							id="group"
							name="group"
							min="1"
							max="5"
							disabled
							value={thisCatch.group}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select style={{ width: 30 + "ch" }} id="sp_code" name="sp_code" disabled>
							<option key={thisCatch.sp_id}>{thisCatch.sp_name}</option>
						</select>
					</label>
					<label className="form__cell">
						Category:
						<input
							style={{ width: 4 + "ch" }}
							type="number"
							id="category"
							name="category"
							min="1"
							max="99"
							disabled
							value={thisCatch.category}
						/>
					</label>
					<label className="form__cell">
						Weight(g.):
						<input
							style={{ width: 8 + "ch" }}
							type="number"
							id="weight"
							name="weight"
							min="1"
							max="99999999"
							disabled
							value={thisCatch.weight}
						/>
					</label>

					<label className="form__cell">
						Sampled weight(g.):
						<input
							disabled
							style={{ width: 8 + "ch" }}
							type="number"
							className="input__noSpinner"
							id="sampled_weight"
							name="sampled_weight"
							min="1"
							max="99999999"
							value={thisCatch.sampled_weight || ""}
						/>
					</label>
					<CatchButtonBar
						className=""
						catchId={thisCatch.id}
						catchStatus={catchStatus}
						viewSexes={viewSexes}
						editCatchStatus={editCatchStatus}
						deleteCatch={deleteCatch}
						handleViewSexes={handleViewSexes}
					/>
				</form>
			);
		} else if (catchStatus === "edit") {
			return (
				<form
					className="form__cell"
					onSubmit={(e) => {
						e.preventDefault();
						updateCatch(catchId);
						editCatchStatus("view");
					}}
				>
					<input type="hidden" id="haul_id" name="haul_id" value={thisCatch.haul_id} />
					<label className="form__cell">
						Group:
						<input
							style={{ width: 5 + "ch" }}
							type="number"
							id="group"
							name="group"
							autoFocus
							min="1"
							max="5"
							value={thisCatch.group}
							onChange={handleChangeGroup(thisCatch.id)}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select
							style={{ width: 30 + "ch" }}
							id="sp_code"
							name="sp_code"
							value={thisCatch.sp_id + "--" + thisCatch.sp_code + "--" + thisCatch.sp_name}
							onChange={handleChangeSpecies(thisCatch.id)}
						>
							{speciesContext.species
								.filter((s) => s.group === parseInt(thisCatch.group))
								.map((s) => (
									<option
										key={s.id + "--" + s.sp_code + "--" + s.sp_name}
										value={s.id + "--" + s.sp_code + "--" + s.sp_name}
									>
										{s.sp_code}-{s.sp_name}
									</option>
								))}
						</select>
					</label>
					<label className="form__cell">
						Category:
						<input
							style={{ width: 4 + "ch" }}
							type="number"
							id="category"
							name="category"
							min="1"
							max="99"
							value={thisCatch.category}
							onChange={handleChangeCategory(thisCatch.id)}
						/>
					</label>
					<label className="form__cell">
						Weight(g.):
						<input
							style={{ width: 8 + "ch" }}
							type="number"
							id="weight"
							name="weight"
							min="1"
							max="99999999"
							value={thisCatch.weight}
							onChange={handleChangeWeight(thisCatch.id)}
						/>
					</label>
					<label className="form__cell">
						Sampled weight(g.):
						<input
							style={{ width: 8 + "ch" }}
							type="number"
							id="sampled_weight"
							name="sampled_weight"
							min="1"
							max="99999999"
							value={thisCatch.sampled_weight}
							onChange={handleChangeSampledWeight(thisCatch.id)}
						/>
					</label>
					<CatchButtonBar
						catchStatus={catchStatus}
						editCatchStatus={editCatchStatus}
						handleCancel={handleCancel}
					/>
				</form>
			);
		}
	};

	return renderContent();
};

export default CatchForm;
