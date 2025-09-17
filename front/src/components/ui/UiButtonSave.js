import React from "react";
/**
 * Component of button to add a new element.
 * Used in any form to send it.
 * @param {text} buttonText text to show in the button.
 * @param {boolean} disabled boolean to disable the button.
 */
const UiButtonSave = ({ buttonText, disabled }) => {
  const renderedButton = (
    <button
      className="buttonsWrapper__button"
      type="submit"
      disabled={disabled}
    >
      {buttonText}
    </button>
  );

  return renderedButton;
};

export default UiButtonSave;
