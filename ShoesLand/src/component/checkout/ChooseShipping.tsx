import ShippingSelection from "../../component/checkout/Shipping";
import { IoMdArrowRoundBack } from "react-icons/io";


export type ShippingOption = {
  id: number;
  name: string;
  cost: number;
  Description?: string;
};


type ShippingSelectionProps = {
  onSelect: (option: ShippingOption) => void;
  onClose: () => void
  selectedMethod: ShippingOption | null
};

const ChooseShipping = ({ onSelect, onClose, selectedMethod }: ShippingSelectionProps) => {

  return (
    <div className="ChooseShipping px-5 h-screen">
      <div className="header flex items-center justify-between py-4 font-semibold text-lg">
        <div className="flex items-center">
          <button onClick={() => onClose()}>
            <IoMdArrowRoundBack className="w-7" />
          </button>
          <h1 className="font-semibold">Choose Shipping</h1>
        </div>
      </div>
      {/* Only render ShippingSelection if needed */}
      {(
        <ShippingSelection
          options={[
            {
              id: 1,
              name: "Economy",
              Description: "Estimated Arrival, Dec 20-23",
              cost: 10,
            },
            {
              id: 2,
              name: "Regular",
              Description: "Estimated Arrival, Dec 20-23",
              cost: 15,
            },
            {
              id: 3,
              name: "Cargo",
              Description: "Estimated Arrival, Dec 19-20",
              cost: 20,
            },
            {
              id: 4,
              name: "Express",
              Description: "Estimated Arrival, Dec 18-19",
              cost: 30,
            },
          ]}
          onSelect={(method) => {
            onSelect(method)
          }}
          onClose={() => onClose()}
          selectedMethod={selectedMethod}
        />
      )}
    </div>
  );
};
export default ChooseShipping;
