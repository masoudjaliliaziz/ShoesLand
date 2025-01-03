import React from "react";
import { addressHooks } from "../../api/queryClinet";

type Address = {
  name: string;
  address: string;
  isSelected: boolean;
};

type AddressSelectionProps = {
  onClose: () => void;
};

const AddressSelection: React.FC<AddressSelectionProps> = ({ onClose }) => {
  const { data: addresses } = addressHooks.useFetchAddress();
  const { mutate } = addressHooks.useAddToAddress();
  const handleSelect = (address: Address) => {
    mutate(
      { name: address.name },
      {
        onSuccess: () => {
          console.log("Selected Address:", address);
          onClose();
        },
      }
    );
  };

  return (
    <div className="address-selection">
      <h2>Select Address</h2>
      <ul>
        {addresses?.map((address: Address, index) => (
          <li
            key={index}
            onClick={() => handleSelect(address)}
            style={{ cursor: "pointer" }}
          >
            <p>{address.address}</p>
            <p>
              {address.name}, {address.address},{" "}
              {address.isSelected && "deafult"}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddressSelection;
