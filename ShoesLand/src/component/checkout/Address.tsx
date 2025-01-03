import React from "react";
import { addressHooks } from "../../api/queryClinet";

type Address = {
  id: number;
  address: string;
  city: string;
  zipCode: string;
};

type AddressSelectionProps = {
  onClose: () => void;
};

const AddressSelection: React.FC<AddressSelectionProps> = ({ onClose }) => {
  const { data: addresses } = addressHooks.useFetchAddress();

  const handleSelect = (address: Address) => {
    // todo: Logic to select address
    console.log("Selected Address:", address);
    onClose();
  };

  return (
    <div className="address-selection">
      <h2>Select Address</h2>
      <ul>
        {addresses?.map((address: Address) => (
          <li
            key={address.id}
            onClick={() => handleSelect(address)}
            style={{ cursor: "pointer" }}
          >
            <p>{address.address}</p>
            <p>
              {address.city}, {address.zipCode}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddressSelection;
