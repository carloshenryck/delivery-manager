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
    <div className="max-w-screen-2xl 2xl:mx-auto px-[10%]">
      <Navbar />
      <div className="text-2xl sm:text-3xl font-normal mt-10">
        <h1>Finalizar Pedido</h1>
      </div>
      <ShoppingCart
        products={ cart }
        buttonEnabled
        prefix="customer_checkout"
      />
      <div className="mt-16 mb-8 text-2xl sm:text-3xl font-medium">
        <h1>Detalhes e Endereço para Entrega</h1>
      </div>
      <form className="flex flex-col md:flex-row flex-wrap gap-4">
        <label className="flex flex-col gap-4" htmlFor="seller">
          Pessoa Vendedora Responsável
          <select
            className="h-10 bg-transparent border-2
            outline-2 outline-[#a0a0a0] px-4 rounded-lg w-full"
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
        <label htmlFor="address" className="flex flex-col gap-4">
          Endereço
          <input
            className="h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg w-full"
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange={ (e) => setDeliveryAddress(e.target.value) }
          />
        </label>
        <label htmlFor="address-number" className="flex flex-col gap-4 w-full md:w-1/5">
          Número
          <input
            className="h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg w-full"
            type="number"
            id="address-number"
            data-testid="customer_checkout__input-address-number"
            value={ deliveryNumber }
            onChange={ (e) => setDeliveryNumber(e.target.value) }
          />
        </label>
      </form>
      <div className="w-full flex flex-col items-center mt-10">
        <button
          type="button"
          className="w-full sm:w-fit mb-24 bg-[#FCE457] rounded-md px-0 sm:px-20 py-3
        text-[#564E22] font-medium"
          data-testid="customer_checkout__button-submit-order"
          onClick={ finishOrder }
        >
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}
