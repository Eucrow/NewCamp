import React, { Component } from "react";

class ViewSp extends Component {
	/**
	 * View sp component with details.
	 * @param {object} props.sp
	 * @param {method} props.changeDetail
	 */
	render() {
		const sp = this.props.sp;
		return (
			<div>
				group: {sp.group} - sp_code: {sp.sp_code} - sp_name: {sp.sp_name} - spanish_name: {sp.spanish_name} -
				a_param: {sp.a_param} - b_param: {sp.b_param} - l_infinity: {sp.l_infinity} - k: {sp.k} - t_zero:{" "}
				{sp.t_zero} - unit: {sp.unit} - increment: {sp.increment} - trophic_group: {sp.trophic_group} - APHIA:{" "}
				{sp.APHIA} - comment: {sp.comment}
				<button
					onClick={() => {
						this.props.changeDetail(false);
					}}
				>
					Hide
				</button>
			</div>
		);
	}
}

export default ViewSp;
