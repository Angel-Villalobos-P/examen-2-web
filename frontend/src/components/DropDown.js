import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropDown = ({ items, handleSelect, itemSelected, title }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {Object.keys(itemSelected).length != 0 ? itemSelected.nombre : title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item, i) => {
          return (
            <Dropdown.Item onClick={() => handleSelect(item)}>
              {item.nombre}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
