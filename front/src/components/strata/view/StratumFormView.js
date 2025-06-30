import React, { useContext } from "react";

import StrataContext from "../../../contexts/StrataContext";
import StratumButtonBar from "../StratumButtonBar";

const StratumFormView = ({ stratum, edit, setEdit }) => {
	const strataContext = useContext(StrataContext);

	const renderContent = () => {
		return (
			<form className="form__row form--wide">
				<label className="form__cell">
					Stratum:
					<input
						type="text"
						name="stratum"
						id="stratum"
						disabled
						maxLength="50"
						value={stratum.stratum || ""}
					/>
				</label>

				<label className="form__cell">
					Area:
					<input
						type="number"
						name="area"
						id="area"
						disabled
						min="0"
						value={stratum.area || ""}
					/>
				</label>

				<label className="form__cell">
					Comment:
					<textarea
						name="comment"
						id="comment"
						disabled
						maxLength="1000"
						rows="3"
						value={stratum.comment || ""}
					/>
				</label>

				<StratumButtonBar
					edit={edit}
					setEdit={setEdit}
					stratum={stratum}
					deleteStratum={strataContext.deleteStratum}
				/>
			</form>
		);
	};

	return renderContent();
};

export default StratumFormView;
