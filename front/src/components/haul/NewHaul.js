import React, { Component, Fragment } from "react";

import SurveyContext from "../../contexts/SurveyContext.js";

import NewCommon from "./NewCommon";
import NewMeteorology from "./NewMeteorology.js";
import NewSpecific from "./NewSpecific.js";

class NewHaul extends Component {
	/**
	 * New haul component
	 * @param {function} props.changeAdd
	 * @param {function} props.createHaul
	 */
	constructor(props) {
		super(props);
		this.state = {
			haul: {
				meteo: {},
				station: {},
				sampler: {},
				stratum: {},
				trawl_characteristics: {},
				hydrography_characteristics: {},
			},

			stations: [],
			strata: [],
			samplers: [],
		};

		this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";
		this.apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";
		this.apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeNestedIds = this.handleChangeNestedIds.bind(this);
		this.handleChangeMeteo = this.handleChangeMeteo.bind(this);
		this.handleChangeTrawl = this.handleChangeTrawl.bind(this);
		this.handleChangeHydrography = this.handleChangeHydrography.bind(this);
	}

	static contextType = SurveyContext;

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		console.log(value);

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
		console.log(value);

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
		console.log("value in handleChangeMeteo: " + value);

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
			const apiStations = this.apiStationsPartial + this.context.surveySelector;
			const apiStrata = this.apiStrataPartial + this.context.surveySelector;
			const apiSamplers = this.apiSamplers;

			// TODO: Optimize fetchs
			// Fetch stations
			fetch(apiStations)
				.then((response) => {
					if (response.status > 400) {
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
					}
					return response.json();
				})
				.then((stations) => {
					this.setState(() => {
						return {
							stations: stations,
						};
					});
				});

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
						console.log(strata);
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
						stations={this.state.stations}
						samplers={this.state.samplers}
						strata={this.state.strata}
					/>
					<NewMeteorology handleChangeMeteo={this.handleChangeMeteo} />
					<NewSpecific
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
