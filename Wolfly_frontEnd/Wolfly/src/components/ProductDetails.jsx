import { ThreeCircles } from "react-loader-spinner";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Appstate } from "../App"; // Assuming you have an Appstate context

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const useAppState = useContext(Appstate); // Access Appstate context

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/product/${slug}/`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(`http://127.0.0.1:8000/${data.front_imges}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [slug]);

  const handleBuyNow = () => {
    navigate("/Checkout");
  };

  const handleAddToCart = (product) => {
    if (!product) return; // Prevent adding if product is not loaded

    try {
        // Get existing cart from local storage or initialize an empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists in the cart
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            // Check stock before updating quantity
            if (existingProduct.quantity < product.stock) {
                // Update quantity and price
                existingProduct.quantity += 1;
                existingProduct.price = product.discount_price * existingProduct.quantity;
            } else {
                toast.error("Stock limit reached", { position: "top-right", autoClose: 1000, theme: "colored" });
                return;
            }
        } else {
            // Add new product to the cart
            cart.push({
                id: product.id,
                title: product.title,
                price: product.discount_price,
                quantity: 1,
                stock: product.stock,
                front_imges: product.front_imges,
                back_imges: product.back_imges,
                category: product.category,
            });
        }

        // Update local storage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count in global state (Appstate)
        useAppState.setAddCart(cart.length);

        // Show success message
        toast.success("Product added to cart!", { position: "top-right", autoClose: 1000, theme: "colored" });
    } catch (error) {
        console.error("Error handling the cart:", error);
        toast.error("Something went wrong. Please try again.", { position: "top-right", autoClose: 1000, theme: "colored" });
    }
};



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeCircles visible={true} height="100" width="100" color="#000" ariaLabel="three-circles-loading" />
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar theme="dark" />
      <div className="flex flex-col items-center bg-gray-100 p-6">
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-3 gap-10">
          {/* Product Images */}
          <div className="flex flex-col items-center">
            <img src={selectedImage} alt="Product" className="w-96 h-99 object-cover border rounded-lg shadow-md" />
            <div className="flex gap-3 mt-4">
              <img
                src={`http://127.0.0.1:8000/${product.front_imges}`}
                alt="Front"
                className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80"
                onClick={() => setSelectedImage(`http://127.0.0.1:8000/${product.front_imges}`)}
              />
              <img
                src={`http://127.0.0.1:8000/${product.back_imges}`}
                alt="Back"
                className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80"
                onClick={() => setSelectedImage(`http://127.0.0.1:8000/${product.back_imges}`)}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
            <h4 className="text-xl font-bold text-gray-800">Brand: {product.brand.name}</h4>
            <p className="text-gray-600 mt-3">{product.decription}</p>
            <div className="text-2xl font-semibold text-gray-800 mt-3">
              Actual Price: <span className="line-through">₹{product.actual_price}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-800 mt-3">
              Discount Price: <span>₹{product.discount_price}</span>
            </div>
            <p className="text-green-600 mt-1">Available Stock: {product.stock}</p>
            <p className="text-gray-500 mt-2">🚚 Free Delivery in 2-5 days</p>
          </div>

          {/* Order Section */}
          <div className="border p-5 rounded-lg shadow-md bg-gray-50">
            <p className="text-xl font-semibold text-gray-800">Order Now</p>
            <p className="text-green-600 mt-1">✅ Eligible for free shipping</p>
            <div className="flex flex-col gap-3 mt-5">
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg font-semibold text-lg"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold text-lg"
                onClick={handleBuyNow}
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;