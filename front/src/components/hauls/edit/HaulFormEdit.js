import React, { useContext, useState } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulButtonBar from "../HaulButtonBar";

const HaulFormEdit = ({
  thisHaul,
  setThisHaul,
  station_id,
  edit,
  setEdit,
  handleChangeNestedIds,
}) => {
  /**
   * @param {object} haul
   * @param {number} station_id
   * @param {boolean} edit
   * @param {method} setEdit
   * @param {method} handleChangeNestedIds
   * @param {method} validateHaulSampler
   * @returns {JSX.Element}
   *  */

  const stationsContext = useContext(StationsContext);

  const [backupHaul] = useState(thisHaul);

  const handleSubmit = e => {
    e.preventDefault();
    stationsContext.updateHaulCommon(thisHaul);
    setEdit(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setThisHaul(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });
  };

  const handleCancel = status => {
    stationsContext.restoreHaulCommon(backupHaul.id);
    setThisHaul(backupHaul);
    setEdit(status);
  };

  /**
   * Handle change Stratum field.
   * @param {event} e
   * @param {number} id_haul of haul to change.
   */
  const handleChangeStratum = e => {
    const value = e.target.value;

    const stratumValue = stationsContext.strata.find(
      s => s.id === parseInt(value)
    );

    setThisHaul(prev_state => {
      return {
        ...prev_state,
        stratum_id: value,
        stratum: stratumValue.stratum,
      };
    });
  };

  const handleChangeGear = e => {
    const value = e.target.value;

    const gear = stationsContext.trawls.find(g => g.id === parseInt(value));

    if (thisHaul.sampler_id === 1) {
      setThisHaul(prev_state => {
        return {
          ...prev_state,
          trawl_id: value,
          trawl: gear.name,
        };
      });
    }

    if (thisHaul.sampler_id === 2) {
      setThisHaul(prev_state => {
        return {
          ...prev_state,
          ctd_id: value,
          ctd: gear.name,
        };
      });
    }
  };

  const handleChangeValid = e => {
    const value = !Boolean(e.target.value);

    setThisHaul(prev_state => {
      return {
        ...prev_state,
        valid: value,
      };
    });
  };

  const handleChangeSpecial = e => {
    const value = !Boolean(e.target.value);

    setThisHaul(prev_state => {
      return {
        ...prev_state,
        special: value,
      };
    });
  };

  const renderContent = () => {
    return (
      <form
        className="form__row form--wide"
        onSubmit={e => handleSubmit(e, thisHaul.id, station_id)}
      >
        <label className="form__cell">
          Sampler:
          <select
            id="sampler_id"
            name="sampler"
            className="select__normalWidth"
            autoFocus
            disabled
            value={thisHaul.sampler_id || "choose"}
            onChange={handleChangeNestedIds}
          >
            {stationsContext.samplers.map(sampler => {
              return (
                <option key={sampler.id} value={sampler.id}>
                  {sampler.sampler}
                </option>
              );
            })}
          </select>
        </label>
        <label className="form__cell">
          Haul:
          <input
            type="number"
            name="haul"
            id="haul"
            className="input__noSpinner"
            min="1"
            max="99"
            maxLength="2"
            size={2}
            value={thisHaul.haul || ""}
            onChange={e => {
              handleChange(e);
            }}
          />
        </label>

        {thisHaul.sampler_id === 1 ? (
          <label className="form__cell">
            Gear:
            <select
              id="trawl_id"
              name="trawl_id"
              className="select__gear"
              value={thisHaul.trawl_id || "choose"}
              onChange={e => {
                handleChangeGear(e);
              }}
            >
              {stationsContext.trawls.map(trawl => {
                return (
                  <option key={trawl.id} value={trawl.id}>
                    {trawl.name}
                  </option>
                );
              })}
            </select>
          </label>
        ) : null}

        {thisHaul.sampler_id === 2 ? (
          <label className="form__cell">
            Gear:
            <select
              id="ctd_id"
              name="ctd_id"
              className="select__gear"
              value={thisHaul.ctd_id || "choose"}
              onChange={e => {
                handleChangeGear(e);
              }}
            >
              {stationsContext.ctds.map(ctd => {
                return (
                  <option key={ctd.id} value={ctd.id}>
                    {ctd.name}
                  </option>
                );
              })}
            </select>
          </label>
        ) : null}

        <label className="form__cell">
          Valid:
          <input
            type="checkbox"
            name="valid"
            id="valid"
            defaultChecked={thisHaul.valid}
            value={thisHaul.valid || ""}
            onChange={e => {
              handleChangeValid(e);
            }}
          />
        </label>

        <label className="form__cell">
          Special:
          <input
            type="checkbox"
            name="special"
            id="special"
            defaultChecked={thisHaul.special}
            value={thisHaul.special || ""}
            onChange={e => {
              handleChangeSpecial(e);
            }}
          />
        </label>

        {thisHaul.sampler_id === 1 ? (
          <label className="form__cell">
            Stratum:
            <select
              id="stratum_id"
              name="stratum_id"
              className="select__largeWidth"
              value={thisHaul.stratum_id || "choose"}
              onChange={e => {
                handleChangeStratum(e);
              }}
            >
              {stationsContext.strata.map(stratum => {
                return (
                  <option key={stratum.id} value={stratum.id}>
                    {stratum.stratum}
                  </option>
                );
              })}
            </select>
          </label>
        ) : null}

        <HaulButtonBar
          haul_id={thisHaul.id}
          edit={edit}
          setEdit={setEdit}
          deleteHaul={stationsContext.deleteHaul}
          handleCancel={handleCancel}
        />
      </form>
    );
  };

  return renderContent();
};

export default HaulFormEdit;
