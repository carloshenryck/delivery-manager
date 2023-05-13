import React, { useContext } from 'react';
import { CustomerContext } from '../context/CustomerContext';

function ItemCard() {
  const {
    products,
    setProducts,
    cart,
    setCart } = useContext(CustomerContext);

  const updateCart = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);
    const newQty = Number(product.quantity);

    if (isInCart && (newQty === 0)) {
      const newCart = cart.filter((item) => item.id !== product.id);
      setCart(newCart);
      return 0;
    }

    if (isInCart) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) return product;
        return item;
      });
      setCart(newCart);
      return 0;
    }

    if (!isInCart && newQty !== 0) {
      const newCart = [...cart, product];
      setCart(newCart);
      return 0;
    }
  };

  const changeQuantity = (e, id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = { ...product, quantity: e.target.value };
        updateCart(updatedProduct);
        return updatedProduct;
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleAddButton = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = { ...product, quantity: product.quantity + 1 };
        updateCart(updatedProduct);
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleRemoveButton = (id) => {
    const verifyProduct = products.find((product) => product.id === id);
    if (verifyProduct.quantity - 1 < 0) return 0;

    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = { ...product, quantity: product.quantity - 1 };
        updateCart(updatedProduct);
        return updatedProduct;
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  return (
    <div
      className="grid grid-cols-2
      md:grid-cols-3 mt-9 mb-32 gap-x-2 gap-y-6"
    >
      { products.map((product) => (
        <div
          key={ product.id }
          className="flex justify-center
          items-center flex-col sm:flex-row border-solid border-[1px]
          border-[#BDBDBD] rounded-lg sm:h-32 px-2 py-5 gap-2"
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          <div>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              className="w-full mb-3 sm:mb-0 sm:w-48 aspect-square"
              src={ product.url_image }
              alt="product demo"
            />
          </div>
          <div>
            <div className="font-medium">
              <h2
                data-testid={ `customer_products__element-card-title-${product.id}` }
              >
                { product.name }
              </h2>
            </div>
            <div className="item_price_container">
              <h4
                data-testid={ `customer_products__element-card-price-${product.id}` }
                className="text-[#7E7E7E] mt-1"
              >
                R$
                {' '}
                { product.price.toString().replace('.', ',') }
              </h4>
            </div>
            <div className="flex w-full sm:w-11/12 gap-2 mt-5">
              <button
                type="button"
                className="bg-[#FCE457] rounded-md px-3 py-2"
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                onClick={ () => handleRemoveButton(product.id) }
              >
                -
              </button>
              <input
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                type="number"
                className="w-full border-[1px] border-[#BDBDBD] rounded-md
                outline-[#898989] text-center"
                value={ product.quantity }
                onChange={ (e) => changeQuantity(e, product.id) }
                min="0"
              />
              <button
                type="button"
                className="bg-[#FCE457] rounded-md px-3 py-2"
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                onClick={ () => handleAddButton(product.id) }
              >
                +
              </button>
            </div>
          </div>
        </div>
      )) }
    </div>
  );
}

export default ItemCard;
