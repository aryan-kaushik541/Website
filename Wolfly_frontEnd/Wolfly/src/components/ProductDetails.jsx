


import { ThreeCircles } from 'react-loader-spinner';



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/product/${slug}/`);
        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  const handleBuyNow = () => {
    navigate('/Checkout'); 
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product is already in cart
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart successfully!");
  };



  return (
    <>
    {
      loading?
    <div className="flex justify-center items-center h-screen">
            {/* <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#000"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> */}
            Loading...
          </div>
          :
    <div className="flex flex-col items-center bg-gray-100 p-6 ">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-3 gap-10">
        
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <img 
            src={`http://127.0.0.1:8000/${product.front_imges}`}
            alt={`http://127.0.0.1:8000/${product.front_imges}`}
            className="w-96 h-99 object-cover border rounded-lg shadow-md"
          />
          <div className="flex gap-3 mt-4">
            <img 
              src={`http://127.0.0.1:8000/${product.front_imges}`}
              alt={`http://127.0.0.1:8000/${product.front_imges}`} 
              className="w-20 h-30 object-cover border rounded-md cursor-pointer hover:opacity-80"
              onClick={() => setSelectedImage(product.image)}
            />
            <img 
              src={`http://127.0.0.1:8000/${product.back_imges}`} 
              alt={`http://127.0.0.1:8000/${product.back_imges}`} 
              className="w-20 h-30 object-cover border rounded-md cursor-pointer hover:opacity-80"
              onClick={() => setSelectedImage(product.back_image)}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
          <h4 className="text-1xl font-bold text-gray-800">Brand: {product.brand.name}</h4>
          <p className="text-gray-600 mt-3">{product.decription}</p>
          <div className="text-2xl font-semibold text-gray-800 mt-3">actual_price <span className='line-through'>₹{product.actual_price}</span></div>
          <div className="text-2xl font-semibold text-gray-800 mt-3">discount_price <span>₹{product.discount_price}</span></div>
          
          <p className="text-green-600 mt-1">Available {product.stock}</p>
          <p className="text-gray-500 mt-2">🚚 Free Delivery in 2-5 days</p>
        </div>

        {/* Order Section */}
        <div className="border p-5 rounded-lg shadow-md bg-gray-50">
          <p className="text-xl font-semibold text-gray-800">Order Now</p>
          {/* <div className="text-3xl font-semibold text-gray-800 mt-2">{product.price}</div> */}
          <p className="text-green-600 mt-1">✅ Eligible for free shipping</p>
          <div className="flex flex-col gap-3 mt-5">
            <button 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg font-semibold text-lg"
              onClick={addToCart} // ✅ Adds product to cart
            >
              🛒 Add to Cart
            </button>
            <button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold text-lg"
              onClick={handleBuyNow} // ✅ Redirects on click
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
}
    </>
  );
};

export default ProductDetails;