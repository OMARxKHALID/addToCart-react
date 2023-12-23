import { useState } from 'react';
import './App.css'; 

function App() {
  const Product = [
    {
      id: 101,
      title: "Krunch Burger",
      desc: "Krunch fillet, spicy mayo, lettuce, sandwiched between a sesame seed bun",
      image: "https://www.kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-krunch_variant_0-2023-05-31115706.png",
      price: 270,
      qty: 5,
    },
    {
      id: 102,
      title: "Zingeratha",
      desc: "Tender boneless strips, sliced onions, tangy imli chutney, mint mayo, wrapped in a soft paratha",
      image: "https://www.kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-zingeratha_variant_0-2023-05-31115706.png",
      price: 220,
      qty: 10,
    },
    {
      id: 103,
      title: "Rice & Spice",
      desc: "Spiced and buttery rice with 6 pcs of Hot Shots topped with our signature Vietnamese sauce",
      image: "https://www.kfcpakistan.com/images/43a95f10-ffaa-11ed-b673-4121381f04c6-rice-and-spice_variant_0-2023-05-31115706.png",
      price: 320,
      qty: 0,
    }
  ];
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (selectedProduct) => {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === selectedProduct.id);

        if (existingProduct) {
          const updatedCart = prevCart.map((item) =>
            item.id === selectedProduct.id ? { ...item, qty: item.qty + 1 } : item
          );
          return updatedCart;
        } else {
          const productToAdd = { ...selectedProduct, qty: 1 };
          return [...prevCart, productToAdd];
        }
      });

      setCartTotal((prevTotal) => prevTotal + selectedProduct.price);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return  (
    <div className="container my-5">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-brand btn btn-light text-dark"
            onClick={toggleCart}
          >
            <h3>🛒 Cart {cart.length} | 💵 Rs.{cartTotal}</h3>
          </button>
        </div>
      </nav>

      {showCart && (
        <div className="cart-dropdown">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Qty</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.title}</td>
                  <td>{cartItem.qty}</td>
                  <td>Rs. {cartItem.price * cartItem.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="row mt-4">
        {Product.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.desc}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-price">Rs. {product.price}</h5>
                </div>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;