import React, { useState } from "react";
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
  const [newAddress, setNewAddress] = useState({ name: "", address: "" });
  const [isCreating, setIsCreating] = useState(false);

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

  const handleCreateAddress = () => {
    mutate(newAddress, {
      onSuccess: () => {
        console.log("New address added:", newAddress);
        setIsCreating(false); // Close the creation form/modal
      },
    });
  };

  return (
    <div className="address-selection">
      <h2>Select Address</h2>
      <ul>
        {addresses?.map((address: Address, index: number) => (
          <li
            key={index}
            onClick={() => handleSelect(address)}
            style={{ cursor: "pointer" }}
          >
            <p>{address.address}</p>
            <p>
              {address.name}, {address.address},{" "}
              {address.isSelected && "default"}
            </p>
          </li>
        ))}
      </ul>

      {/* Button to open create address form */}
      <button onClick={() => setIsCreating(true)}>Create Address</button>

      {/* Conditional rendering for the create address form */}
      {isCreating && (
        <div className="create-address-form">
          <h3>Create New Address</h3>
          <input
            type="text"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
          />
          <button onClick={handleCreateAddress}>Add Address</button>
          <button onClick={() => setIsCreating(false)}>Cancel</button>
        </div>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddressSelection;
