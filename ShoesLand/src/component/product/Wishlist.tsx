import { wishlistHooks } from "../../api/queryClinet";
import clsx from 'clsx';
import { GoHeart } from "react-icons/go";



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
    <div className={clsx(isInWishlist && 'bg-red-500', )}
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
    >
      <GoHeart className={clsx("size-9 mr-2",isInWishlist && 'fill-red-500 ')} />
    </div>
  );
};

