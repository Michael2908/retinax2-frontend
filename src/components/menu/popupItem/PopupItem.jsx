import React, { useState } from "react";

const PopupItem = (props) => {
  const {
    defaultValue,
    sendRequest,
    closeWindow,
    title,
    submitTitle,
    controls,
  } = props;
  const [itemState, setItemState] = useState(defaultValue || {});

  const stateHandler = (event) => {
    const { name, value } = event.target;
    setItemState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    sendRequest(itemState);
    closeWindow();
  };

  return (
    <form className="main-popup" onSubmit={submitHandler}>
      <div className="popup-inner">
        <div className="container">
          <label>{title}</label>

          {controls.map((control) => (
            <div>
              <label>{control.label}</label>
              <input
                type={control.input.type || "text"}
                value={itemState[control.input.name]}
                name={control.input.name}
                onChange={stateHandler}
                placeholder={control.input.placeholder}
              />
            </div>
          ))}

          <div className="accept">
            <button type="submit">{submitTitle}</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PopupItem;
