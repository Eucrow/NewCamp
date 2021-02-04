import React, { Component } from "react";

class EditSp extends Component {
	/**
	 * Edit sp component with details.
	 * @param {object} props.sp
	 * @param {method} props.changeDetail
	 * @param {method} props.changeEdit
	 * @param {method} props.handleChange
	 * @param {method} props.handleUpdateSp
	 */
	render() {
		const sp = this.props.sp;
		return (
			<form
				onSubmit={(e) => {
					this.props.handleUpdateSp(e, sp.id);
					this.props.changeEdit(false);
				}}
			>
				group: {sp.group} - sp_code: {sp.sp_code} - <label htmlFor="haul">sp_name:</label>
				<input
					type="text"
					id="sp_name"
					name="sp_name"
					value={sp.sp_name}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">spanish_name:</label>
				<input
					type="text"
					id="spanish_name"
					name="spanish_name"
					value={sp.spanish_name}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">a_param:</label>
				<input
					type="text"
					id="a_param"
					name="a_param"
					value={sp.a_param}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>{" "}
				- <label htmlFor="haul">b_param:</label>
				<input
					type="text"
					id="b_param"
					name="b_param"
					value={sp.b_param}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">l_infinity:</label>
				<input
					type="text"
					id="l_infinity"
					name="l_infinity"
					value={sp.l_infinity}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">k:</label>
				<input
					type="text"
					id="k"
					name="k"
					value={sp.k}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>- <label htmlFor="haul">t_zero:</label>
				<input
					type="text"
					id="t_zero"
					name="t_zero"
					value={sp.t_zero}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>{" "}
				- <label htmlFor="haul">unit:</label>
				<input
					type="text"
					id="unit"
					name="unit"
					value={sp.unit}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">increment:</label>
				<input
					type="text"
					id="increment"
					name="increment"
					value={sp.increment}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">trophic_group:</label>
				<input
					type="text"
					id="trophic_group"
					name="trophic_group"
					value={sp.trophic_group}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">APHIA:</label>
				<input
					type="text"
					id="APHIA"
					name="APHIA"
					value={sp.APHIA}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				- <label htmlFor="haul">comment:</label>
				<input
					type="text"
					id="comment"
					name="comment"
					value={sp.comment}
					onChange={(e) => this.props.handleChange(e, sp.id)}
				/>
				<input type="submit" value="Save" />
			</form>
		);
	}
}

export default EditSp;
