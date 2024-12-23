import { useState, useEffect } from "react";
import axios from "axios";

export const WishlistIcon = ({ productId, userId }: { productId: number; userId: number }) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/users/${userId}`);
        const user = response.data;

        if (!user) {
          alert("User not found!");
          return;
        }

        setIsInWishlist(user.wishlist.includes(productId));
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to fetch user data.");
      }
    };

    fetchData();
  }, [userId, productId]);

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/users/${userId}`);
      const user = response.data;

      if (!user) {
        alert("User not found!");
        return;
      }

      if (isInWishlist) {
        const updatedWishlist = user.wishlist.filter((id: number) => id !== productId);
        await axios.put(`http://localhost:5173/users/${userId}`, { ...user, wishlist: updatedWishlist });
        setIsInWishlist(false);
        alert("Product removed from wishlist!");
      } else {
        const updatedWishlist = [...user.wishlist, productId];
        await axios.put(`http://localhost:5173/users/${userId}`, { ...user, wishlist: updatedWishlist });
        setIsInWishlist(true);
        alert("Product added to wishlist!");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      alert("Failed to update wishlist.");
    }
  };

  return (
    <div
      onClick={handleAddToWishlist}
      style={{ cursor: "pointer" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isInWishlist ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
};

