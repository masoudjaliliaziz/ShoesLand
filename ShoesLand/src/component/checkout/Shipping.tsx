import React, { useState } from "react";
import Truck from '../../assets/Truck.svg';

type ShippingOption = {
  id: number;
  name: string;
  cost: number;
  Description: string;
};

type ShippingSelectionProps = {
  options: ShippingOption[];
  onSelect: (option: ShippingOption) => void;
  onClose: () => void;
  selectedMethod: ShippingOption | null;
};

const ShippingSelection: React.FC<ShippingSelectionProps> = ({
  options,
  onSelect,
  onClose,
  selectedMethod,
}) => {
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(
    selectedMethod
  );

  const handleApply = () => {
    if (selectedOption) {
      onSelect(selectedOption);
      onClose();
    }
  };

  return (
    <div className="shipping-selection px-5 py-4">
      <h2 className="font-semibold text-lg mb-4">Choose a Shipping Method</h2>
      <ul className="space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`w-full bg-white flex flex-row justify-between items-center rounded-xl px-3 py-4 shadow-md transition-shadow cursor-pointer ${selectedOption?.id === option.id ? "border-2 border-black" : ""
              }`}
            onClick={() => setSelectedOption(option)}
          >
            <div className="flex flex-row items-center space-x-2">
              <img
                src={Truck}
                alt="shipping"
                className="w-10 h-10 rounded-full bg-black p-2"
              />
              <div className="flex flex-col ml-2">
                <h3 className="font-semibold text-base">{option.name}</h3>
                <span className="text-sm text-gray-500">
                  {option.Description}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">${option.cost}</span>
              <input
                type="radio"
                name="shippingOption"
                className="w-5 h-5 accent-black"
                checked={selectedOption?.id === option.id}
                readOnly
              />
            </div>
          </div>
        ))}
      </ul>

      <div className="mt-6 flex justify-center ">
        <button
          onClick={handleApply}
          className="buttom-0 px-6 py-4 bg-black text-white w-full rounded-full font-semibold"
          disabled={!selectedOption}
        >
          Apply
        </button>
      </div>

    </div>
  );
};

export default ShippingSelection;

