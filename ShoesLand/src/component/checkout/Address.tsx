import React, { useEffect, useState } from "react";
import { addressHooks } from "../../api/queryClinet";
import backward from "../../assets/Backward.svg";
import Location from "../../assets/Location.svg";

import Loading from '../../component/base/Loading'

type Address = {
  name: string;
  address: string;
  isSelected: boolean;
};

type AddressSelectionProps = {
  onClose: () => void;
};

const AddressSelection: React.FC<AddressSelectionProps> = ({ onClose, }) => {
  const { data: addresses, isLoading } = addressHooks.useFetchAddress();
  const { mutate, isPending } = addressHooks.useAddToAddress();
  const [newAddress, setNewAddress] = useState({ name: "", address: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleSelect = (address: Address) => {
    setSelectedAddress(address)
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
        setIsCreating(false);
      },
    });
  };
  if (isLoading || isPending) return <Loading />
  return (
    <div className="address-selection h-screen py-3 px-5">
      <div className="header flex items-center justify-between py-4 font-semibold text-lg">
        <div className="flex items-center">
          <button onClick={() => onClose()}>
            <img src={backward} alt="backward" className="w-6 mr-1" />
          </button>
          <h1 className="font-semibold">Choose Address</h1>
        </div>
      </div>
      <ul>
        {addresses.map((address: Address, index: number) => (
          <div
            key={index}
            className={`w-[95%] bg-white my-3 flex flex-row justify-between items-center mx-auto rounded-xl px-3 py-4 shadow-md shadow-slate-200 transition-shadow ${selectedAddress?.address == address.address ? "border-2 border-black" : ""
              }`}
            onClick={() => setSelectedAddress(address)}
          >
            <div className="flex flex-row items-center space-x-2">
              <div className="locationIcon">
                <div className="bg-gray-200 rounded-full w-9 p-1.5 flex items-center justify-center">
                  <img
                    src={Location}
                    alt="location"
                    className="size-6 rounded-full bg-slate-800 p-1"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <div className="flex flex-row items-center">
                  <h3 className="font-normal text-base leading-none ">
                    {address.name}
                  </h3>
                  {selectedAddress?.address == address.address &&
                    <h3 className="bg-gray-300 text-gray-800 px-2 py-1 font-normal rounded-lg text-[0.6rem] mx-2">Deafult</h3>
                  }
                </div>
                <span className="font-light text-xs leading-none text-gray-500">
                  {address.address}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="selectedAddress"
                className="w-5 h-5 accent-black"
                checked={selectedAddress?.address == address.address}
              />

            </div>
          </div>
        ))}
      </ul>

      {/* Button to open create address form */}
      <button className='
w-full py-4 bg-gray-300 font-semibold rounded-full my-8
        ' onClick={() => setIsCreating(true)}>Add New Address</button>

      {/* Conditional rendering for the create address form */}
      {isCreating && (
        <div className="create-address-form">
          <input
            className='
w-full py-3 bg-gray-200 font-semibold rounded-full my-2
pl-4            '
            type="text"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })

            }
          />
          <input
            className='
w-full py-3 bg-gray-200 font-semibold rounded-full 
pl-4            '

            type="text"
            placeholder="Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
          />
          <div className='flex justify-around'>
            <button className='my-4
w-1/3 py-4 bg-black font-semibold rounded-full 
    text-white'


              onClick={handleCreateAddress}>Add Address</button>
            <button
              className='my-4 w-1/3
 py-4 bg-gray-300 font-semibold rounded-full 
        text-center    text-black'



              onClick={() => setIsCreating(false)}>Cancel</button>

          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center ">
        <button
          className="buttom-0 px-6 py-4 bg-black text-white w-full rounded-full font-semibold"
          onClick={() => selectedAddress && handleSelect(selectedAddress)}
        >
          Apply
        </button>
      </div>

    </div>
  );
};

export default AddressSelection;
