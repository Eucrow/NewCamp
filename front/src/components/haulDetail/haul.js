import React, { Component, Fragment } from 'react';
import update from 'immutability-helper';

class ComponentsHaul extends Component {
    /**
     * 
     * @param {number} props.hauls_id 
     */
    
    constructor(props) {
        super(props);
        this.state = { 
            haul: {
                meteo: {},
                trawl_characteristics: {}
            },
            isEdit : this.props.location.state.isEdit
         };

        this.apiHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + this.props.match.params.haul_id;

        this.handleChangeHaul = this.handleChangeHaul.bind(this);
        this.handleChangeMeteo = this.handleChangeMeteo.bind(this);
        this.handleChangeTrawl = this.handleChangeTrawl.bind(this);

    }
    
    handleChangeHaul (event) {
        const name = event.target.name;
        const value = event.target.value;

        const newHaulState = update(this.state.haul, {
            [name]: {$set: value}
        })

        this.setState({
            haul: newHaulState
          });
    }

    handleChangeMeteo (event) {
        const name = event.target.name;
        const value = event.target.value;

        const newHaulState = update(this.state.haul, {
            meteo:{
                [name]: {$set: value}
            }
        });

        this.setState({
            haul: newHaulState
        });
    }

    handleChangeTrawl (event) {
        const name = event.target.name;
        const value = event.target.value;

        const newHaulTrawl = update(this.state.haul, {
            trawl_characteristics:{
                [name]: {$set: value}
            }
        });

        this.setState({
            haul: newHaulTrawl
        });
    }
    
    componentDidMount() {
        fetch(this.apiHaul)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!"}
                    });
                }
                return response.json();
            })
            .then(haul => {
                this.setState(() => {
                    return {
                        haul
                    };
                });
            }).then(() => { console.log(this.state.haul);});
    }

    render() {
        const haul = this.state.haul

        const isEdit = this.state.isEdit

        if(isEdit === false){
            return ( 
            <Fragment>
            <p>Haul: {haul.haul}</p>
            <p>Gear: {haul.gear}</p>
            <p>Valid: {haul.valid}</p>
            <p>Meteorology:</p>
            <p>Wind direction: {haul.meteo.wind_direction}</p>
            <p>Wind velocity: {haul.meteo.wind_velocity}</p>
            <p>Sea State: {haul.meteo.sea_state}</p>
            <p>Trawl characteristics:</p>
            <p>Shooting_date_time: {haul.trawl_characteristics.shooting_date_time}</p>
            <p>Shooting_latitude: {haul.trawl_characteristics.shooting_latitude}</p>
            <p>Shooting_longitude: {haul.trawl_characteristics.shooting_longitude}</p>
            <p>Shooting_depth: {haul.trawl_characteristics.shooting_depth}</p>
            <p>Hauling_date_time: {haul.trawl_characteristics.hauling_date_time}</p>
            <p>Hauling_latitude: {haul.trawl_characteristics.hauling_latitude}</p>
            <p>Hauling_longitude: {haul.trawl_characteristics.hauling_longitude}</p>
            <p>Hauling_depth: {haul.trawl_characteristics.hauling_depth}</p>
            <p>Bottom_date_time: {haul.trawl_characteristics.bottom_date_time}</p>
            <p>Bottom_latitude: {haul.trawl_characteristics.bottom_latitude}</p>
            <p>Bottom_longitude: {haul.trawl_characteristics.bottom_longitude}</p>
            <p>Bottom_depth: {haul.trawl_characteristics.bottom_depth}</p>
            <p>Course: {haul.trawl_characteristics.course}</p>
            <p>Velocity: {haul.trawl_characteristics.velocity}</p>
            <p>Cable: {haul.trawl_characteristics.cable}</p>
            <p>Sweep: {haul.trawl_characteristics.sweep}</p>
            <p>Otter_boards_distance: {haul.trawl_characteristics.otter_boards_distance}</p>
            <p>Horizontal_aperture: {haul.trawl_characteristics.horizontal_aperture}</p>
            <p>Vertical_aperture: {haul.trawl_characteristics.vertical_aperture}</p>
            <p>Grid: {haul.trawl_characteristics.grid}</p>
            <p>Track: {haul.trawl_characteristics.track}</p>
            <p>Comment: {haul.trawl_characteristics.comment}</p>
            </Fragment>
            );
        } else if (isEdit===true){
            return(
            <form>
                <label htmlFor="haul">haul:</label> 
                <input type="text" name="haul" id="haul" value={haul.haul || ""} onChange={this.handleChangeHaul} />
                <label htmlFor="gear">gear:</label> 
                <input type="text" name="gear" id="gear" value={haul.gear || ""} onChange={this.handleChangeHaul} />
                <label htmlFor="valid">valid:</label> 
                <input type="text" name="valid" id="valid" value={haul.valid || ""} onChange={this.handleChangeHaul} />
                <p>Meteorology:</p>
                <label htmlFor="wind_direction">wind_direction:</label> 
                <input type="text" name="wind_direction" id="wind_direction" value={haul.meteo.wind_direction || ""} onChange={this.handleChangeMeteo} />
                <label htmlFor="wind_velocity">wind_velocity:</label> 
                <input type="text" name="wind_velocity" id="wind_velocity" value={haul.meteo.wind_velocity || ""} onChange={this.handleChangeMeteo} />
                <label htmlFor="sea_state">sea_state:</label> 
                <input type="text" name="sea_state" id="sea_state" value={haul.meteo.sea_state || ""} onChange={this.handleChangeMeteo} />
                <p>Trawl characteristics:</p>
                <label htmlFor="shooting_date_time">shooting_date_time:</label> 
                <input type="text" name="shooting_date_time" id="shooting_date_time" value={haul.trawl_characteristics.shooting_date_time || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="shooting_latitude">shooting_latitude:</label> 
                <input type="text" name="shooting_latitude" id="shooting_latitude" value={haul.trawl_characteristics.shooting_latitude || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="shooting_longitude">shooting_longitude:</label> 
                <input type="text" name="shooting_longitude" id="shooting_longitude" value={haul.trawl_characteristics.shooting_longitude || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="shooting_depth">shooting_depth:</label> 
                <input type="text" name="shooting_depth" id="shooting_depth" value={haul.trawl_characteristics.shooting_depth || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="hauling_date_time">hauling_date_time:</label> 
                <input type="text" name="hauling_date_time" id="hauling_date_time" value={haul.trawl_characteristics.hauling_date_time || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="hauling_latitude">hauling_latitude:</label> 
                <input type="text" name="hauling_latitude" id="hauling_latitude" value={haul.trawl_characteristics.hauling_latitude || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="hauling_longitude">hauling_longitude:</label> 
                <input type="text" name="hauling_longitude" id="hauling_longitude" value={haul.trawl_characteristics.hauling_longitude || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="hauling_depth">hauling_depth:</label> 
                <input type="text" name="hauling_depth" id="hauling_depth" value={haul.trawl_characteristics.hauling_depth || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="bottom_date_time">bottom_date_time:</label> 
                <input type="text" name="bottom_date_time" id="bottom_date_time" value={haul.trawl_characteristics.bottom_date_time || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="bottom_latitude">bottom_latitude:</label> 
                <input type="text" name="bottom_latitude" id="bottom_latitude" value={haul.trawl_characteristics.bottom_latitude || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="bottom_longitude">bottom_longitude:</label> 
                <input type="text" name="bottom_longitude" id="bottom_longitude" value={haul.trawl_characteristics.bottom_longitude || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="bottom_depth">bottom_depth:</label> 
                <input type="text" name="bottom_depth" id="bottom_depth" value={haul.trawl_characteristics.bottom_depth || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="course">course:</label> 
                <input type="text" name="course" id="course" value={haul.trawl_characteristics.course || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="velocity">velocity:</label> 
                <input type="text" name="velocity" id="velocity" value={haul.trawl_characteristics.velocity || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="cable">cable:</label> 
                <input type="text" name="cable" id="cable" value={haul.trawl_characteristics.cable || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="sweep">sweep:</label> 
                <input type="text" name="sweep" id="sweep" value={haul.trawl_characteristics.sweep || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="otter_boards_distance">otter_boards_distance:</label> 
                <input type="text" name="otter_boards_distance" id="otter_boards_distance" value={haul.trawl_characteristics.otter_boards_distance || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="horizontal_aperture">horizontal_aperture:</label> 
                <input type="text" name="horizontal_aperture" id="horizontal_aperture" value={haul.trawl_characteristics.horizontal_aperture || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="vertical_aperture">vertical_aperture:</label> 
                <input type="text" name="vertical_aperture" id="vertical_aperture" value={haul.trawl_characteristics.vertical_aperture || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="grid">grid:</label> 
                <input type="text" name="grid" id="grid" value={haul.trawl_characteristics.grid || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="track">track:</label> 
                <input type="text" name="track" id="track" value={haul.trawl_characteristics.track || ""} onChange={this.handleChangeTrawl} />
                <label htmlFor="comment">comment:</label> 
                <input type="text" name="comment" id="comment" value={haul.trawl_characteristics.comment || ""} onChange={this.handleChangeTrawl} />
            </form>
            )
        }

    }
}
 
export default ComponentsHaul;
