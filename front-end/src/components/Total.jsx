import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomerContext } from '../context/CustomerContext';

function Total() {
  const navigate = useHistory();
  const { cart } = useContext(CustomerContext);

  const total = cart && cart.map((product) => product.price * product.quantity)
    .reduce((acc, cur) => acc + cur, 0).toFixed(2).replace('.', ',');

  return (
    <div className="fixed bottom-8 right-3 bg-[#FCE457] px-5 py-3 rounded-lg z-40">
      <button
        type="button"
        className="button_cart"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate.push('/customer/checkout') }
        disabled={ !cart.length > 0 }
      >
        <p
          data-testid="customer_spanroducts__checkout-bottom-value"
          className="text-[#564E22] font-medium"
        >
          Ver carrinho:
          {' '}
          <span className="text-[#93853C]">{`R$ ${total || 0}`}</span>
        </p>
      </button>
    </div>
  );
}

export default Total;
