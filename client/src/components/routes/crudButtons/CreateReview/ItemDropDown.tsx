import React, { FC, useState } from "react";
import Select from "react-select";
import Item from "../../../../models/CompoundModels/Item";
import makeAnimated from "react-select/animated";

const defaultLabel = "Select an item";

const animatedComponents = makeAnimated();

class ItemDropDownProps {
  sendOutSelectedItem?: (item: Item) => void;
  items?: Item[];
  multiple?: boolean;
  selectedItemsDefault?: Item[];
}

const ItemDropDown: FC<ItemDropDownProps> = ({
  sendOutSelectedItem,
  items,
  multiple,
  selectedItemsDefault,
}) => {
  const onChangeSelect = (selected: any) => {
    // setSelectedItem(selected)
    if (sendOutSelectedItem) sendOutSelectedItem(selected);
  };

  return (
    <div className="item-dropdown">
      <Select
        isMulti={multiple}
        options={items}
        onChange={(e) => onChangeSelect(e)}
        components={animatedComponents}
        placeholder={defaultLabel}
        value={selectedItemsDefault}
      />
    </div>
  );
};

export default ItemDropDown;
