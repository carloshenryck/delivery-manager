import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import moment from 'moment/moment';

import api from '../../utils/apiURL';
import Navbar from '../../components/SellerNavbar';
import ShoppingCart from '../../components/ShoppingCart';

function SellerOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [preparingButton, setPreparingButton] = useState(false);
  const [deliveryButton, setDeliveryButton] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user;

  const prefix = 'seller_order_details__';
  const inTransit = 'Em Trânsito';
  const orderNumberLength = 4;

  const changeSellerButtons = (status) => {
    if (status === 'Preparando') {
      setPreparingButton(true);
      setDeliveryButton(false);
      setOrderStatus('Preparando');
    }

    if (status === inTransit) {
      setDeliveryButton(true);
      setOrderStatus(inTransit);
    }
  };

  const verifyInitialButtonStates = (status) => {
    if (status === 'Preparando') {
      setPreparingButton(true);
      setDeliveryButton(false);
    }

    if (status === inTransit || status === 'Entregue') {
      setPreparingButton(true);
      setDeliveryButton(true);
    }
  };

  const changeStatus = async (status) => {
    changeSellerButtons(status);
    await api.put(
      `/sale/${id}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  };

  useEffect(() => {
    const getOrder = async () => {
      const response = await api.get(`/sale/${id}`);
      response.data.sellerName = response.data.seller.name;
      setOrder(response.data);
    };
    getOrder();
  }, [id]);

  useEffect(() => {
    verifyInitialButtonStates(order.status);
    setOrderStatus(order.status);
  }, [order]);

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto px-[10%] mb-12">
      <Navbar />
      <div>
        <div
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row
          items-start sm:items-end gap-0 sm:gap-2"
        >
          <p className="text-2xl sm:text-3xl font-normal">Detalhes do pedido</p>
          <p
            className="text-[#BDBDBD] mb-[7px]"
            data-testid={ `${prefix}element-order-details-label-order-id` }
          >
            {`Pedido ${id.padStart(orderNumberLength, '0')}`}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:gap-8 mt-8">
          <div>
            <h3
              className="text-[#BDBDBD] font-medium text-sm sm:text-base"
              data-testid={ `${prefix}element-order-details-label-seller-name` }
            >
              Pessoa Vendedora:
            </h3>
            <p className="text-xl sm:text-2xl font-normal">{`${order.sellerName}`}</p>
          </div>
          <div>
            <h3
              className="text-[#BDBDBD] font-medium text-sm sm:text-base"
              data-testid={ `${prefix}element-order-details-label-order-date` }
            >
              Data de Solicitação:
            </h3>
            <p className="text-xl sm:text-2xl font-normal">
              { moment(`${order.saleDate}`).format('DD/MM/YYYY') }
            </p>
          </div>
          <div
            className="flex flex-col items-start status_order"
            data-testid={
              `${prefix}element-order-details-label-delivery-status${order.id}`
            }
          >
            <h3 className="text-[#BDBDBD] font-medium text-sm sm:text-base"> Status:</h3>
            <p className="text-xl sm:text-2xl font-normal">{orderStatus}</p>
            <button
              className="bg-[#FCE457] rounded-md px-2 py-2 text-[#564E22]
              font-medium disabled:bg-[#fce35782] disabled:text-[#564e2262]
              disabled:hidden cursor-pointer mb-5"
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              onClick={ () => changeStatus('Preparando') }
              disabled={ preparingButton }
            >
              Preparar Pedido
            </button>
            <button
              className="bg-[#FCE457] rounded-md px-2 py-2 text-[#564E22]
              font-medium disabled:bg-[#fce35782] disabled:text-[#564e2262]
              cursor-pointer mb-5 disabled:hidden"
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              onClick={ () => changeStatus(inTransit) }
              disabled={ deliveryButton }
            >
              Saiu Para Entrega
            </button>
          </div>
        </div>
      </div>
      <ShoppingCart products={ order.products } prefix="seller_order_details" />
    </div>
  );
}

export default SellerOrderDetails;
