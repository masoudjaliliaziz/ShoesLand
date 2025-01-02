import { useMutation } from "@tanstack/react-query";
import { authHooks, cartHooks, wishlistHooks } from "../../api/queryClinet";
import axiosClient from "../../api/axiosClient";
import Heart from "../../assets/Heart";

export const WishlistIcon = ({ productId, isInWishlist }: { productId: number; isInWishlist: boolean }) => {
  const { mutate } = wishlistHooks.useAddRemoveWishlist();

  const handleToggle = () => {
    mutate(
      { productId },
      {
        onSuccess: () => {
          console.log('Wishlist updated successfully');
        },
        onError: (err) => {
          console.error('Failed to update wishlist', err);
        },
      }
    );
  };



  return (
    <div
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
    >
      <Heart />
    </div>
  );
};

