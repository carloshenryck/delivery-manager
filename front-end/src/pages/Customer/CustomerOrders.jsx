import moment from 'moment/moment';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/CustomerNavbar';
import api from '../../utils/apiURL';

function Orders() {
  const [orders, setOrders] = useState();
  const orderNumberLength = 4;

  useEffect(() => {
    const getOrders = async () => {
      const response = await api.get('/sale');
      setOrders(response.data);
    };
    getOrders();
  }, []);

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto px-[10%] mb-12">
      <Navbar />
      <div className="mt-10 grid grid-cols-2 gap-4">
        { orders ? (
          orders.map((order) => (
            <div
              key={ order.id }
              className="flex px-2 py-3 h-24 border-solid border-[1px]
            border-[#BDBDBD] rounded-lg"
            >
              <div className="number_order">
                <Link to={ `/customer/orders/${order.id}` }>
                  <p
                    className="order_title"
                    data-testid={ `customer_orders__element-order-id-${order.id}` }
                  >
                    Pedido nº
                    { ' ' }
                    {String(order.id).padStart(orderNumberLength, '0')}
                  </p>
                </Link>
              </div>

              <p
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                <b>Status:</b>
                {' '}
                {order.status}
              </p>

              <p
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                <b>Data:</b>
                {' '}
                { moment(`${order.saleDate}`).format('DD/MM/YYYY') }
              </p>

              <p
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                <b>Valor Total:</b>
                {' '}
                {`R$ ${order.totalPrice.toString().replace('.', ',')}` }
              </p>
            </div>
          ))
        ) : <p> Você não tem pedidos </p> }
      </div>
    </div>
  );
}

export default Orders;
