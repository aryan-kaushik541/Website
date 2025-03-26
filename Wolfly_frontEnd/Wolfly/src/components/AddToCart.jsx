import products from '../api/product.json'
import { useEffect, useState, useContext } from 'react'
import { Appstate } from '../App'
import emptyCart from '../Images/cart.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddToCart = () => {
    const useAppState = useContext(Appstate);

    const [cartProduct, setCartProduct] = useState([]);
    const [TaxPrice, setTaxPrice] = useState({
        subTotal: 0,
        tax: 50,
        finalPrice: 0
    })
    const notify = (msg) => toast(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",

    });


    const getProduct = () => JSON.parse(localStorage.getItem('products'));
    const setProduct = (itemName) => {
        const jsonData = JSON.stringify(itemName)
        localStorage.setItem("products", jsonData)
    }
    const updateLocalStorage = (currElement) => {
        const fiterExiPro = getProduct();

        return fiterExiPro.map((ele) => {
            if (ele.id === currElement.id) {
                ele.id = currElement.id;
                ele.price = currElement.price;
                ele.quantity = currElement.quantity;
                return ele;

            }
            return ele
        })
    }
    const getData = () => {
        const exsitingProducts = getProduct();
        if (!exsitingProducts) { return }
        const filterProducts = exsitingProducts.filter((currEle) => {
            return products.filter((proCurrEle) => {
                if (proCurrEle.id === currEle.id) {
                    currEle.category = proCurrEle.category;
                    currEle.imges = proCurrEle.imges;
                    currEle.title = proCurrEle.title
                    currEle.stock = proCurrEle.stock
                    return currEle;
                }
            })
        })
        setCartProduct(filterProducts)



    }
    const addPrice = () => {
        const productDetail = getProduct()
        let subTotal;

        if (productDetail) {
            subTotal = productDetail.reduce((total, currEle) => {
                return total += currEle.price
            }, 0)
            const finalPrice = TaxPrice.tax + subTotal
            setTaxPrice({
                subTotal: subTotal,
                tax: TaxPrice.tax,
                finalPrice: finalPrice
            })
        }



    }
    useEffect(() => {
        getData();
        addPrice();
    }, [])

    const increment = (currElement) => {

        if (currElement['quantity'] >= currElement['stock']) {
            notify(`only ${currElement['quantity']} products are avilable`)
            return
        }
        const singlePriceQuantity = currElement.price / currElement.quantity;
        currElement.price = currElement.price + singlePriceQuantity;
        currElement.quantity = currElement.quantity + 1;

        setCartProduct([...cartProduct])
        const updatedPro = updateLocalStorage(currElement);
        setProduct(updatedPro)
        addPrice();
    }

    const decrement = (currElement) => {
        if (currElement['quantity'] <= 1) {
            notify(`You can't add 0 product`)
            return
        }
        const singlePriceQuantity = currElement.price / currElement.quantity;
        currElement.price = currElement.price - singlePriceQuantity;
        currElement.quantity = currElement.quantity - 1;

        setCartProduct([...cartProduct])
        const updatedPro = updateLocalStorage(currElement);
        setProduct(updatedPro)
        addPrice();
    }

    const removeCart = (currEle) => {
        
        const product = getProduct();
        const index = product.findIndex(ele => ele.id === currEle.id)
        product.splice(index, 1)
        setProduct(product)
        
        useAppState.setAddCart(product.length)
        getData();

        if (product.length === 0)
            localStorage.removeItem('products')
        // addsum
        addPrice();
    }
    return (

        <>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"

                />


            </div>
            <section>
                <div className='my-0 mx-auto py-4 md:px-11 px-2 min-w-56'>
                    {
                        cartProduct.map((currEle) => {
                            return (
                                <div key={currEle.id}>
                                    <article className='flex justify-between sm:flex-row md:flex-row flex-col items-center  gap-2 rounded-md shadow-lg py-5 px-4  flex-wrap border-2'>
                                        <div>
                                            <span className='text-dark-teal bg-teal-100 py-1 px-4 rounded-full'>{currEle.category}</span>
                                        </div>
                                        <div>
                                          
                                            <img src={currEle.back_imges} alt={currEle.back_imges} className='sm:w-14 md:w-14 w-32' />
                                        </div>
                                        <h2 className='text-3xl sm:text-xl md:text-xl  font-bold '>{currEle.title}</h2>
                                        <p className='text-3xl sm:text-xl md:text-xl '>
                                            {currEle.price.toLocaleString('en-In')}
                                        </p>
                                        <div className='grid items-center grid-cols-3 my-3 mx-0 border-2 border-gray-500 rounded-lg'>

                                            <button className='py-1 px-4 font-bold border-r-2 border-gray-500  text-lg' onClick={() => decrement(currEle)} >-</button>

                                            <p className='py-1 px-4 text-center text-lg'>{currEle.quantity}</p>

                                            <button className='py-1 px-4 font-bold border-l-2 border-gray-500 text-lg' onClick={() => increment(currEle)}>+</button>

                                        </div>
                                        <button className='bg-dark-teal text-teal-100 py-2 w-full sm:w-fit md:w-fit  px-4 rounded-md hover:text-dark-teal hover:bg-teal-100 transition-all duration-400' onClick={() => removeCart(currEle)} >
                                            Remove
                                        </button>
                                    </article>
                                </div>
                            )

                        })

                    }
                    {
                        cartProduct.length !== 0 ?
                            <section className='flex justify-end pt-10 '>
                                <div className='border-2 border-gray-700 p-5 w-full sm:w-fit md:w-fit  '>
                                    <p className='text-lg border-b-2 border-gray-700  '>Selected Offer Summary</p>
                                    <div className=''>
                                        <div className='grid grid-flow-col gap-4  pt-2'>
                                            <p>
                                                Sub Total:
                                            </p>
                                            <p>

                                                ₹{TaxPrice.subTotal.toLocaleString('en-In')}

                                            </p>
                                        </div>
                                        <div className='grid grid-flow-col gap-5 py-2 border-b-2 border-gray-600'>
                                            <p>
                                                Tax:
                                            </p>
                                            <p>

                                                ₹{TaxPrice.tax.toLocaleString('en-In')}
                                            </p>
                                        </div>
                                        <div className='grid grid-flow-col gap-4 pt-2'>
                                            <p>
                                                Final Total:
                                            </p>
                                            <p>

                                                ₹{TaxPrice.finalPrice.toLocaleString('en-In')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            :
                            <div className='flex  justify-center  min-w-52 h-96  '>

                                <img src={emptyCart} alt={emptyCart} />
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default AddToCart
