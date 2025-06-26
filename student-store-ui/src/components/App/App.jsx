import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import { calculateItemSubtotal, calculateOrderSubtotal, calculateTotal } from "../../utils/calculations";
import "./App.css";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // fetching data products from localhost:3000/products
  useEffect(() => {  // recall useEffect runs on every render
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products');
        if (data) setProducts(data);  // updating the products state
      } catch(error) {
        console.error('Error fetching products:', error);
      } 
    } 
    fetchData();
    }, []);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    // quick note: req body is what i want to change, response data is what ive changed and what it looks like
    setIsCheckingOut(true);
    setError(null);

    try {
      if (!userInfo.name || userInfo.name.trim() === "") {  // validating user info before checkout (make sure theres a name)
        throw new Error("Please enter your name before checkout");
      }
      
      const cartItems = Object.entries(cart).map(([productId, quantity]) => {  // want to map over card to get productId & quantity for calculation of total in the future using premade functions
        const product = products.find(p => p.id === Number(productId));
        return {
          price: product.price,
          quantity: quantity
        }
      })

      const subTotal = calculateOrderSubtotal(cartItems);
      const finalTotal = calculateTotal(subTotal);  // includes the tax
      console.log('calculated totals:', { subTotal, finalTotal });

      // creating order (letting backend calculate total)  // sending data TO the backend
      const orderResponse = await axios.post('http://localhost:3000/orders', {  // creating a new order (backend expects customer, total, & status). // object sent in axios.post becomes req.body in backend order controller
        total: finalTotal, // backend will calculate this
        customer: Number(userInfo.name) || 1, // ensuring student id is a number, but using 1 as default if conversion fails
        status: "completed"
      });
      console.log('order created response:', orderResponse.data);
      
      // i need an order id for the next steps (assigning order items to a specific id)
      const order = orderResponse.data;  // response structure is {data: actualResponse (contains id, customer, total, status, etc.), status: ...}, why we access orderResponse.data

      // adding each item from cart to the order  // i need to loop through my cart and add each item individually
      // quick note: there exists Object.keys Object.values and Object.enries (used to loop through object and return arrays containing different things)
      for (const [productId, quantity] of Object.entries(cart)) {  // i need to loop through each item in my cart // addOrderItems is expecting {productId, quantity, price (from products array)}. // cart = {'productId': quantity} -> Object.entries(cart) -> [['productId', quantity]]
        // i need the product details to get the price
        const product = products.find(p => p.id === Number(productId));  // finding full product details w/ specific id in order to extract the price
        
        // add this specific item to the order i just created
        await axios.post(`http://localhost:3000/orders/${order.id}/items`, {  // sending data TO the backend
          productId: Number(productId),  // js/http converts everything to strings -> must encapsulate in Number()
          quantity: Number(quantity),
          price: Number(product.price)  // using product (which is the product w/ the specific id, we can extract the price (something we dont already have from the cart map))
        });
      }

      setCart({});  // clear cart -> empty dictionary
      setOrder(order);  // save order  // updating frontend state w/ the response
      console.log('Checkout completed!');
    
    } catch (error) {
      console.error('Checkout failed:', error);
      setError('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 