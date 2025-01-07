import { useState } from "react";
import ShippingSelection from "../../component/checkout/Shipping";


const ChooseShipping = () => {
  const [shippingMethod, setShippingMethod] = useState(null);
  const [isSelectingShipping, setIsSelectingShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

 
  return (
    <div className="checkout px-5">

      {/* Only render ShippingSelection if needed */}
      {isSelectingShipping && (
        <ShippingSelection
          options={[
            { id: 1, name: "Standard Shipping", cost: 20 },
            { id: 2, name: "Express Shipping", cost: 50 },
          ]}
          onSelect={(method) => {
            setShippingMethod(method);
            setShippingCost(method.cost);
            setIsSelectingShipping(false);
          }}
          onClose={() => setIsSelectingShipping(false)}
        />
      )}

    </div>
  );
};
export default ChooseShipping;
