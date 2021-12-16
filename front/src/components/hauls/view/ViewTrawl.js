import React, { Component } from "react";

class ComponentsHaulTrawl extends Component {
	/**
	 * Component of trawl form of haul.
	 * @param {object} props.haul
	 */

	render() {
		const haul = this.props.haul;
		return (
			<fieldset class="wrapper haul__row">
				<legend>Trawl characteristics</legend>
				{/* <div className="haul__row"> */}
				<div className="haul__cell">
					<div className="haul__label">Shooting_date_time:</div>
					{/* <div> */}
					<time
						dateTime={
							haul.trawl_characteristics.shooting_date_time || ""
						}
					>
						{new Intl.DateTimeFormat("es-ES", {
							year: "numeric",
							month: "long",
							day: "2-digit",
							hour: "numeric",
							minute: "numeric",
							second: "numeric",
							timeZone: "UTC",
							timeZoneName: "short",
						}).format(
							new Date(
								haul.trawl_characteristics.shooting_date_time
							)
						)}

						{/* {haul.trawl_characteristics.shooting_date_time ||
								""} */}
					</time>
					{/* </div> */}
				</div>

				<div className="haul__cell">
					<div className="haul__label">Shooting_latitude:</div>
					<div>
						{haul.trawl_characteristics.shooting_latitude || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Shooting_longitude:</div>
					<div>
						{haul.trawl_characteristics.shooting_longitude || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Shooting_depth:</div>
					<div>{haul.trawl_characteristics.shooting_depth || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Hauling_date_time:</div>
					<div>
						{haul.trawl_characteristics.hauling_date_time || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Hauling_latitude:</div>
					<div>
						{haul.trawl_characteristics.hauling_latitude || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Hauling_longitude:</div>
					<div>
						{haul.trawl_characteristics.hauling_longitude || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Hauling_depth:</div>
					<div>{haul.trawl_characteristics.hauling_depth || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Bottom_date_time:</div>
					<div>
						{haul.trawl_characteristics.bottom_date_time || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Bottom_latitude:</div>
					<div>
						{haul.trawl_characteristics.bottom_latitude || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Bottom_longitude:</div>
					<div>
						{haul.trawl_characteristics.bottom_longitude || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Bottom_depth:</div>
					<div>{haul.trawl_characteristics.bottom_depth || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Course:</div>
					<div>{haul.trawl_characteristics.course || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Velocity:</div>
					<div>{haul.trawl_characteristics.velocity || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Cable:</div>
					<div>{haul.trawl_characteristics.cable || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Sweep:</div>
					<div>{haul.trawl_characteristics.sweep || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Otter_boards_distance:</div>
					<div>
						{haul.trawl_characteristics.otter_boards_distance || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Horizontal_aperture:</div>
					<div>
						{haul.trawl_characteristics.horizontal_aperture || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Vertical_aperture:</div>
					<div>
						{haul.trawl_characteristics.vertical_aperture || ""}
					</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Grid:</div>
					<div>{haul.trawl_characteristics.grid || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Track:</div>
					<div>{haul.trawl_characteristics.track || ""}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Comment:</div>
					<div>{haul.trawl_characteristics.comment || ""}</div>
				</div>
				{/* </div> */}
			</fieldset>
		);
	}
}

export default ComponentsHaulTrawl;