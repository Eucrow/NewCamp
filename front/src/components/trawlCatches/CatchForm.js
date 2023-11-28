import React, { useEffect, useState } from "react";
import CatchButtonBar from "./CatchButtonBar";

// class ComponentCategory extends Component {
const CatchForm = ({
	catch_status,
	this_catch,
	species,
	createCatch,
	handleChangeGroup,
	handleChangeSpecies,
	handleChangeCategory,
	handleChangeWeight,
	handleChangeSampledWeight,
	updateCatch,
	editCatchStatus,
	catch_id,
	view_sexes,
	handleCancel,
	deleteCatch,
	handleViewSexes,
}) => {
	/**
	 * Category Component
	 * @param {string} props.catch_status: state of Catch component: "", "view" or "edit".
	 * @param {object} props.this_catch: catch managed by this component
	 * @param {object} props.species: species list.
	 * @param {method} props.editCatchStatus: manage catch_status state.
	 * @param {method} props.handleChangeGroup: managing of group field.
	 * @param {method} props.handleChangeSpecies: managing of species field.
	 * @param {method} props.handleChangeCategory: managing of category field.
	 * @param {method} props.handleChangeWeight: managing of weight field.
	 * @param {method} props.handleChangeSampledWeight: managing of sampled_weight field.
	 * @param {method} props.createCatch: create catch in database.
	 */

	const [group, setGroup] = useState("");
	const [sp_id, setSp_id] = useState("");
	const [category, setCategory] = useState("");
	const [weight, setWeight] = useState("");
	const [sampled_weight, setSampled_weight] = useState("");
	const [new_catch, setNew_catch] = useState({ group, sp_id, category, weight });

	useEffect(() => {
		setNew_catch({ group, sp_id, category, weight });
	}, [group, sp_id, category, weight]);

	const renderContent = () => {
		if (catch_status === "add") {
			return (
				<form
					onSubmit={(e) => {
						createCatch(e, new_catch);
					}}
				>
					<label className="form__cell">
						Group:
						<input
							value={group}
							style={{ width: 5 + "ch" }}
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
							{species.map((s) => {
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
					<CatchButtonBar catch_status={"add"} />
				</form>
			);
		} else if (catch_status === "view" || catch_status === "") {
			// const sampled_weight = this_catch.sampled_weight ? this_catch.sampled_weight : null;
			// const sampled_weight_id = this_catch.sampled_weight_id ? this_catch.sampled_weight_id : null;

			return (
				<form className="form__cell form__cell__catches--left">
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
							value={this_catch.group}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select style={{ width: 30 + "ch" }} id="sp_code" name="sp_code" disabled>
							<option
								key={this_catch.sp_id}
								// value={this_catch.sp_id}
							>
								{/* {species.find((s) => s.)} */}
								{this_catch.sp_name}
							</option>
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
							value={this_catch.category}
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
							value={this_catch.weight}
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
							value={this_catch.sampled_weight || ""}
						/>
					</label>
					<CatchButtonBar
						className="form__cell__catches--left"
						catch_id={this_catch.id}
						catch_status={catch_status}
						view_sexes={view_sexes}
						editCatchStatus={editCatchStatus}
						deleteCatch={deleteCatch}
						handleViewSexes={handleViewSexes}
					/>
				</form>
			);
		} else if (catch_status === "edit") {
			return (
				<form
					className="form__cell form__cell__catches--left"
					onSubmit={(e) => {
						updateCatch(catch_id);
						editCatchStatus("view");
					}}
				>
					<input type="hidden" id="haul_id" name="haul_id" value={this_catch.haul_id} />
					<label className="form__cell">
						Group:
						<input
							style={{ width: 5 + "ch" }}
							type="number"
							id="group"
							name="group"
							min="1"
							max="5"
							value={this_catch.group}
							onChange={handleChangeGroup(this_catch.id)}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select
							style={{ width: 30 + "ch" }}
							id="sp_code"
							name="sp_code"
							value={this_catch.sp_id + "--" + this_catch.sp_code + "--" + this_catch.sp_name}
							onChange={handleChangeSpecies(this_catch.id)}
						>
							{species
								.filter((s) => s.group === parseInt(this_catch.group))
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
							value={this_catch.category}
							onChange={handleChangeCategory(this_catch.id)}
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
							value={this_catch.weight}
							onChange={handleChangeWeight(this_catch.id)}
						/>
					</label>
					<label className="form__cell">
						Sampled weight(g.):
						<input
							style={{ width: 8 + "ch" }}
							type="number"
							className="input__noSpinner"
							id="sampled_weight"
							name="sampled_weight"
							min="1"
							max="99999999"
							value={this_catch.sampled_weight}
							onChange={handleChangeSampledWeight(this_catch.id)}
						/>
					</label>
					<CatchButtonBar
						catch_status={catch_status}
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
