import { useContext } from 'react';
import PropTypes from 'prop-types';
import { BsTrash } from 'react-icons/bs';
import { CustomerContext } from '../context/CustomerContext';

export default function ShoppingCart({ products = [], buttonEnabled = false, prefix }) {
  const { setCart } = useContext(CustomerContext);
  const fixNumberFormat = (number) => number.toFixed(2).toString().replace('.', ',');

  const totalValue = () => {
    let total = 0;
    if (buttonEnabled) {
      total = products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    } else {
      total = products.reduce((acc, curr) => acc + curr.SaleProduct.quantity
      * Number(curr.price), 0);
    }
    return fixNumberFormat(total);
  };

  const removeFromCart = (id) => {
    const newCart = products.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const getQuantity = (product) => {
    if (product.quantity) { return product.quantity; }
    return product.SaleProduct.quantity;
  };

  return (
    <section>
      <div
        className="w-full grid grid-cols-1
        md:grid-cols-2 px-[10%] my-10 gap-x-2 gap-y-6"
      >
        { products.map((product, index) => (
          <div
            key={ `produto_${index}` }
            className="flex items-start px-2 py-3 h-24 border-solid border-[1px]
          border-[#BDBDBD] rounded-lg"
          >
            <div className="img_shop_cart_container h-full self-center">
              <img
                src={ product.url_image }
                alt={ `imagem de  ${product.name}` }
                className="h-full aspect-square"
              />
            </div>
            <div className="mr-3">
              <p
                className=" text-base sm:text-lg lg:text-xl font-medium"
              >
                { product.name }
              </p>
              <p className="text-[#7E7E7E] text-sm lg:text-base">
                {getQuantity(product)}
                { 'x R$ '}
                {fixNumberFormat(Number(product.price))}
              </p>
            </div>
            { buttonEnabled ? (
              <button
                className="self-start ml-auto mr-2"
                type="button"
                id="deleteBtn"
                data-testid={
                  `customer_checkout__element-order-table-remove-${index}`
                }
                onClick={ () => removeFromCart(product.id) }
              >
                <BsTrash />
              </button>
            ) : <>.</> }
          </div>
        ))}
      </div>

      <div
        className="total_container"
        data-testid={ `${prefix}__element-order-total-price` }
      >
        { `Total: R$ ${totalValue()}` }
      </div>
    </section>
  );
}

ShoppingCart.propTypes = {
  products: PropTypes.array,
  buttonEnabled: PropTypes.bool,
  prefix: PropTypes.string,
}.isRequired;
