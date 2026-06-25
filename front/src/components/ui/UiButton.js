import React from "react";

const UiButton = ({children, method, buttonText, disabled = false}) => {
    const hasChildren = children !== undefined;

    const buttonClass = hasChildren
        ? "buttonsWrapper__button icon_button"
        : "buttonsWrapper__button";

    const renderedButton = (
        <button
            className={buttonClass}
            type="button"
            title={buttonText}
            disabled={disabled}
            onClick={e => {
                method(e);
            }}
        >
            {hasChildren ? children : buttonText}
        </button>
    );

    return renderedButton;
};

export default UiButton;
