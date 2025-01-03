import React from "react";

type ShippingOption = {
  id: number;
  name: string;
  cost: number;
};

type ShippingSelectionProps = {
  options: ShippingOption[];
  onSelect: (option: ShippingOption) => void;
  onClose: () => void;
};

const ShippingSelection: React.FC<ShippingSelectionProps> = ({
  options,
  onSelect,
  onClose,
}) => {
  return (
    <div className="shipping-selection">
      <h2>Select Shipping Method</h2>
      <ul>
        {options.map((option) => (
          <li
            key={option.id}
            onClick={() => onSelect(option)}
            style={{ cursor: "pointer" }}
          >
            <p>{option.name}</p>
            <p>Cost: ${option.cost}</p>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ShippingSelection;
