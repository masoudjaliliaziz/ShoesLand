import React from "react";
import Truck from '../../assets/Truck.svg'
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
  selectedMethod: ShippingOption | null
};

const ShippingSelection: React.FC<ShippingSelectionProps> = ({
  options,
  onSelect,
  onClose,
  selectedMethod
}) => {
  return (
    <div className="shipping-selection">
      <ul>
        {options.map((option, index) => (
          <>

            <div
              key={index}
              className={`w-[95%] bg-white my-5 flex flex-row justify-between items-center mx-auto rounded-xl px-3 py-4 shadow-md shadow-slate-200 transition-shadow ${selectedMethod?.id == option.id ? "border-2 border-black" : ""
                }`}
              onClick={() => onSelect(option)}
            >
              <div className="flex flex-row items-center space-x-2">
                <div className="locationIcon">
                  <img
                    src={Truck}
                    alt="location"
                    className="size-12 rounded-full bg-black p-3"
                  />
                </div>
                <div className="flex flex-col space-y-1 ml-2">
                  <div className="flex flex-row items-center">
                    <h3 className="font-normal text-base leading-none ">
                      {option.name}
                    </h3>
                  </div>
                  <span className="font-light text-xs leading-none text-gray-500">
                    {option.Description}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className='font-bold'>${option.cost}</span>
                <input
                  type="radio"
                  name="selectedAddress"
                  className="w-5 h-5 accent-black"
                  checked={selectedMethod?.id == option.id}
                />

              </div>
            </div>

          </>
        ))}
      </ul>
    </div>
  );
};

export default ShippingSelection;
