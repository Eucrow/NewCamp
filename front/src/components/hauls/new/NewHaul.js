import React, { Component, Fragment } from "react";

import NewCommon from "./NewCommon";
import NewSpecific from "./NewSpecific.js";

class NewHaul extends Component {
	/**
	 * New haul component
	 * @param {number} props.station_id
	 * @param {method} props.changeAdd
	 * @param {method} props.createHaul
	 */
	constructor(props) {
		super(props);
		this.state = {
			haul: {
				meteo: {},
				station: { id: this.props.station_id },
				sampler: {},
				stratum: {},
				gear: null,
				trawl_characteristics: {},
				hydrography_characteristics: {},
			},
			strata: [],
			samplers: [],
			gears: [],
		};
		this.apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";
		this.apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";
		this.apiGears = "http://127.0.0.1:8000/api/1.0/trawl/basic/";

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeNestedIds = this.handleChangeNestedIds.bind(this);
		this.handleChangeMeteo = this.handleChangeMeteo.bind(this);
		this.handleChangeTrawl = this.handleChangeTrawl.bind(this);
		this.handleChangeHydrography = this.handleChangeHydrography.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			haul: {
				...this.state.haul,
				[name]: value,
			},
		});
	}

	handleChangeNestedIds(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			haul: {
				...this.state.haul,
				[name]: {
					id: value,
				},
			},
		});
	}

	handleChangeMeteo(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			haul: {
				...this.state.haul,
				meteo: {
					...this.state.haul.meteo,
					[name]: value,
				},
			},
		});
	}

	handleChangeTrawl(event) {
		const name = event.target.name;
		const value = event.target.value;
		console.log("value in handleChangeTrawl: " + value);

		this.setState({
			haul: {
				...this.state.haul,
				trawl_characteristics: {
					...this.state.haul.trawl_characteristics,
					[name]: value,
				},
			},
		});
	}

	handleChangeHydrography(event) {
		const name = event.target.name;
		const value = event.target.value;
		console.log("value in handleChangeHydrography: " + value);

		this.setState({
			haul: {
				...this.state.haul,
				hydrography_characteristics: {
					...this.state.haul.hydrography_characteristics,
					[name]: value,
				},
			},
		});
	}

	componentDidMount() {
		/**
		 * First, check if a survey is selected. If doesn't, redirec to hauls page.
		 */
		if (this.context.surveySelector === null) {
			//TODO: I think this is not working in the right way
			this.setState(() => {
				this.context.surveySelector = 1;
			});
			this.forceUpdate();
		} else {
			/**
			 * When the component is mounted, retrieve the posible stratum and sampler and save in state
			 */
			const apiStrata =
				this.apiStrataPartial + this.context.surveySelector;
			const apiSamplers = this.apiSamplers;
			const apiGears = this.apiGears;

			// TODO: Optimize fetchs
			// Fetch strata
			fetch(apiStrata)
				.then((response) => {
					if (response.status > 400) {
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
					}
					return response.json();
				})
				.then((strata) => {
					this.setState(() => {
						return {
							strata: strata,
						};
					});
				});

			// Fetch samplers
			fetch(apiSamplers)
				.then((response) => {
					if (response.status > 400) {
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
					}
					return response.json();
				})
				.then((samplers) => {
					this.setState(() => {
						return {
							samplers: samplers,
						};
					});
				});

			// Fetch gears
			fetch(apiGears)
				.then((response) => {
					if (response.status > 400) {
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
					}
					return response.json();
				})
				.then((gears) => {
					this.setState(() => {
						return {
							gears: gears,
						};
					});
				});
		}
	}

	render() {
		return (
			<Fragment>
				<form>
					<NewCommon
						haul={this.state.haul}
						handleChange={this.handleChange}
						handleChangeNestedIds={this.handleChangeNestedIds}
						samplers={this.state.samplers}
						strata={this.state.strata}
						gears={this.state.gears}
					/>
					<NewSpecific
						handleChangeMeteo={this.handleChangeMeteo}
						handleChangeTrawl={this.handleChangeTrawl}
						handleChangeHydrography={this.handleChangeHydrography}
						sampler_id={this.state.haul.sampler.id}
					/>

					<input
						type="submit"
						value="Save Haul"
						onClick={(e) => {
							this.props.createHaul(e, this.state.haul);
							this.props.changeAdd(false);
						}}
					/>
				</form>
			</Fragment>
		);
	}
}

export default NewHaul;