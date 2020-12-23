import React, { Fragment, useState } from 'react';

const ButtonSampledWeight = (props) => {
    
    // const [ handleChangeSampledWeight, sampled_weight ] = props;

    const [s_w_state, setS_w_state] = React.useState("view");

    if (s_w_state === "view"){
        return(
            <Fragment>
                { props.sampled_weight }
                <button onClick={() => setS_w_state("edit")}>Edit sampled weight</button>
            </Fragment>
        )
            
    } else if (s_w_state === "edit"){
        return(
            
            <form>
                <input
                    type= "number"
                    id="sampled_weight"
                    name="sampled_weight"
                    value={ props.sampled_weight }
                    onChange={
                        props.handleChangeSampledWeight(props.sampled_weight_id)
                        }/>
                <input
                    type="submit"
                    value="Save sampled weight"
                    onClick= { () => {
                        props.updateSampledWeight(props.sampled_weight_id)
                        setS_w_state("view") }
                        }/>
            </form>

        )
    }

}

export default ButtonSampledWeight;