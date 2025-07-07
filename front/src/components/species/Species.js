import React, { useState, useContext } from "react";

import { API_CONFIG } from "../../config/api.js";

import GlobalContext from "../../contexts/GlobalContext";
import SpeciesContext from "../../contexts/SpeciesContext";

import Sp from "./Sp";
import NewSpForm from "./NewSpForm";
import SpeciesButtonBar from "./SpeciesButtonBar";

const Species = () => {
  const globalContext = useContext(GlobalContext);

  const [add, setAdd] = useState(false);

  /**
   * Get the first code unused of a group of the list of species.
   * @param {numeric} group Group os species
   * @returns {numeric} Code unused in the list of species.
   */
  const getEmptySpCode = group => {
    const sps = globalContext.species.filter(sp => sp.group === group);

    const codes = sps.map(sp => sp.sp_code);

    codes.sort();

    const correlative = Array.from(codes, (v, i) => i + 1);

    const emptyCode = correlative.find(x => !codes.includes(x));

    return emptyCode;
  };

  const handleChange = (e, sp_id) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    globalContext.setSpecies(prevState => {
      const sps = prevState.map(sp => {
        if (sp.id === sp_id) {
          return { ...sp, [name]: value };
        } else {
          return sp;
        }
      });
      return sps;
    });
  };

  const handleUpdateSp = (e, sp_id) => {
    e.preventDefault();

    const api = globalContext.apiSpecies + "/" + sp_id;

    fetch(api, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(globalContext.species[sp_id]),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  const deleteSp = sp_id => {
    const api = globalContext.apiSpecies + sp_id;

    const updatedSpecies = globalContext.species.filter(sp => sp.id !== sp_id);

    fetch(api, {
      method: "DELETE",
      headers: API_CONFIG.HEADERS.DEFAULT,
    })
      .then(() => {
        globalContext.setSpecies(updatedSpecies);
      })
      .catch(error => alert(error));
  };

  /**
   * Save species to database.
   */
  const createSp = (e, new_sp) => {
    e.preventDefault();

    fetch(globalContext.apiSpecies, {
      method: "POST",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(new_sp),
    })
      .then(response => response.json())
      .then(c => {
        const new_species = [...globalContext.species, c];
        globalContext.setSpecies(new_species);
      })
      .catch(error => console.log(error));
  };

  // VALIDATIONS
  /**
   * Prevent 'e' and '-' in numeric input
   * @param {e} onKeyDown event
   */
  const preventNegativeE = e => {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  };

  const renderContent = () => {
    var content = "";

    content = (
      <SpeciesContext.Provider
        value={{
          handleChange: handleChange,
          handleUpdateSp: handleUpdateSp,
          createSp: createSp,
          deleteSp: deleteSp,
          handleAdd: setAdd,
          getEmptySpCode: getEmptySpCode,
          preventNegativeE: preventNegativeE,
        }}
      >
        <main>
          <header>
            <h1 className="title">Species</h1>
          </header>

          <div className="wrapper surveysWrapper">
            <SpeciesButtonBar add={add} handleAdd={setAdd} />

            {add === true ? <NewSpForm /> : ""}

            {globalContext.species.map(sp => {
              return <Sp key={sp.id} sp={sp} />;
            })}
          </div>
        </main>
      </SpeciesContext.Provider>
    );

    return content;
  };

  return renderContent();
};

export default Species;
