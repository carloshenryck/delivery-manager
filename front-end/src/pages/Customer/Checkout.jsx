import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../../components/CustomerNavbar';
import ShoppingCart from '../../components/ShoppingCart';

import api from '../../utils/apiURL';
import { CustomerContext } from '../../context/CustomerContext';

export default function Checkout() {
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const { cart } = useContext(CustomerContext);
  const navigate = useHistory();

  const finishOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { token } = user;

    const orderData = {
      totalPrice: cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
      deliveryAddress,
      deliveryNumber,
      sellerId: selectedSeller,
      products: cart,
    };

    try {
      const response = await api.post('/sale', orderData, {
        headers: {
          Authorization: token,
        },
      });

      navigate.push(`/customer/orders/${response.data.message}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getSellers = async () => {
      const response = await api.get('/sale/sellers');
      setSellers(response.data);
      setSelectedSeller(response.data[0].id);
    };
    getSellers();
  }, []);

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto">
      <Navbar />
      <div className="text-2xl sm:text-3xl font-normal mt-10 pl-[10%]">
        <h1>Finalizar Pedido</h1>
      </div>
      <ShoppingCart
        products={ cart }
        buttonEnabled
        prefix="customer_checkout"
      />
      <div className="divider">
        <h1>Detalhes e Endereço para Entrega</h1>
      </div>
      <form>
        <label htmlFor="seller">
          Pessoa Vendedora Responsável
          <select
            id="seller"
            data-testid="customer_checkout__select-seller"
            value={ selectedSeller }
            onChange={ (e) => setSelectedSeller(e.target.value) }
          >
            { sellers.map((seller, index) => (
              <option key={ index } value={ seller.id }>{ seller.name }</option>
            )) }
          </select>
        </label>

        <div id="address_container">
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ (e) => setDeliveryAddress(e.target.value) }
            />
          </label>
          <label htmlFor="address-number">
            Número
            <input
              type="number"
              id="address-number"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ (e) => setDeliveryNumber(e.target.value) }
            />
          </label>
        </div>
      </form>
      <button
        type="button"
        className="total_container"
        data-testid="customer_checkout__button-submit-order"
        onClick={ finishOrder }
      >
        Finalizar pedido
      </button>
    </div>
  );
}
