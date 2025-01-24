import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// Context lets components pass information deep down without explicitly passing props.
// The context object itself does not hold any information. It represents which context other components read or provide.
// SomeContext.Provider lets you provide the context value to components.
// value: The value that you want to pass to all the components reading this context inside this provider,
// no matter how deep. The context value can be of any type. A component calling useContext(SomeContext) inside of
// the provider receives the value of the innermost corresponding context provider above it.
export const ShopContext=createContext();
const ShopContextProvider = (props) => {
    const currency="$";
    const delivery_fee=10;
    const backenURL=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('')
    const navigate=useNavigate();

    const addToCart = async (itemId,size) => {

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        // structuredClone is used to clone the object
        let cartData= structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                // If the specific size for the item exists, increment its quantity.This is not 2d Array.
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backenURL + '/api/cart/add', {itemId,size}, {headers:{token}})
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity= async (itemId,size,quantity) => {
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backenURL + '/api/cart/update', {itemId,size,quantity}, {headers:{token}})
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const getCartAmount= () => {
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backenURL + '/api/cart/get', {}, {headers:{token}})
            console.log(response.data)
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getProductsData = async () => {
        try {
            const response = await axios.get(backenURL + '/api/product/li')
            console.log(response.data);
            
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value={
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backenURL,
        token,
        setToken,
        setCartItems
    }

    return(
        <ShopContext.Provider value={value}>
            {/* if i remove this line {props.children}then everything get's wipe out.why? */}
            {props.children} 
        </ShopContext.Provider>
    )
}

export default ShopContextProvider