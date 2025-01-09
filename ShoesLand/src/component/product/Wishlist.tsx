import { wishlistHooks } from "../../api/queryClinet";
import Heart from "../../assets/Heart.svg";
import clsx from 'clsx';


export const WishlistIcon = ({ productId, isInWishlist }: { productId: number; isInWishlist: boolean }) => {
  console.log(isInWishlist)
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
    <div className={clsx(isInWishlist && 'bg-red-500', 'w-5')}
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
    >
      <img src={Heart} alt='heart' className={clsx(isInWishlist && 'bg-red-500')} />
    </div>
  );
};

