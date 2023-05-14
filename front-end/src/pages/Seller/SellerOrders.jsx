import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

import Navbar from '../../components/SellerNavbar';
import api from '../../utils/apiURL';

function SellerOrders() {
  const [orders, setOrders] = useState();
  const [userName, setUserName] = useState('');
  const orderNumberLength = 4;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);

    const getOrders = async () => {
      const response = await api.get('/sale');
      setOrders(response.data);
    };
    getOrders();
  }, []);

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto px-[10%] mb-12">
      <Navbar />
      <p className="text-2xl sm:text-3xl font-light mt-10">
        Bem vindo,
        {' '}
        <br className="block sm:hidden " />
        <span className="font-medium">{ userName }</span>
      </p>
      <div>
        { orders ? (
          orders.map((order) => (
            <div key={ order.id } className="order_card">
              <Link to={ `/seller/orders/${order.id}` }>
                <p
                  data-testid={ `seller_orders__element-order-id-${order.id}` }
                >
                  Pedido Nº
                  {' '}
                  {String(order.id).padStart(orderNumberLength, '0')}
                </p>
              </Link>

              <p
                data-testid={ `seller_orders__element-delivery-status-${order.id}` }
              >
                <b>Status:</b>
                {' '}
                {order.status}
              </p>

              <p
                data-testid={ `seller_orders__element-order-date-${order.id}` }
              >
                <b>Data:</b>
                {' '}
                { moment(`${order.saleDate}`).format('DD/MM/YYYY') }
              </p>

              <p
                data-testid={ `seller_orders__element-card-price-${order.id}` }
              >
                <b>Valor Total:</b>
                {' '}
                {`R$ ${order.totalPrice.toString().replace('.', ',')}` }
              </p>

              <p
                data-testid={ `seller_orders__element-card-address-${order.id}` }
              >
                <b>Endereço de Entrega:</b>
                {' '}
                { `${order.deliveryAddress}, ${order.deliveryNumber}` }
              </p>
            </div>
          ))
        ) : <p> Você não tem pedidos </p> }
      </div>
    </div>
  );
}

export default SellerOrders;
