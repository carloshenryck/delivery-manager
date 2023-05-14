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
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        { orders ? (
          orders.map((order) => (
            <Link
              to={ `/seller/orders/${order.id}` }
              key={ order.id }
              className="flex flex-col px-2 py-3 border-solid border-[1px]
            border-[#BDBDBD] rounded-lg items-center gap-x-2 lg:gap-x-6"
            >
              <div className="flex w-full gap-x-2 lg:gap-x-6">
                <div className="ml-2">
                  <p
                    className="text-sm lg:text-base font-medium"
                    data-testid={ `seller_orders__element-order-id-${order.id}` }
                  >
                    Pedido
                  </p>
                  <p className="text-xl lg:text-2xl text-[#7E7E7E]">
                    {String(order.id).padStart(orderNumberLength, '0')}
                  </p>
                </div>

                <div
                  className="text-sm lg:text-xl bg-[#FCE457] rounded-md h-full
                text-[#564E22] font-medium flex flex-col
                  items-center justify-center w-2/4"
                >
                  <p
                    data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                  >
                    {order.status}
                  </p>
                </div>
                <div className="flex flex-col flex-1 gap-2 h-full">
                  <p
                    className="bg-[#FCE457] rounded-md px-3 h-2/4
                    flex flex-col items-center justify-center text-sm text-[#93853C]
                    font-medium"
                    data-testid={ `customer_orders__element-order-date-${order.id}` }
                  >
                    { moment(`${order.saleDate}`).format('DD/MM/YYYY') }
                  </p>
                  <p
                    className="bg-[#FCE457] rounded-md px-3 h-2/4
                    flex flex-col items-center justify-center text-sm text-[#93853C]
                    font-medium"
                    data-testid={ `customer_orders__element-card-price-${order.id}` }
                  >
                    {`R$ ${order.totalPrice.toString().replace('.', ',')}` }
                  </p>
                </div>
              </div>
              <p
                className="w-full text-end mt-3 text-[#7E7E7E]
                leading-5 text-sm lg:text-base"
                data-testid={ `seller_orders__element-card-address-${order.id}` }
              >
                <b>Endereço de Entrega:</b>
                {' '}
                <span className="font-medium">
                  { `${order.deliveryAddress}, ${order.deliveryNumber}` }
                </span>
              </p>
            </Link>
          ))
        ) : <p> Você não tem pedidos </p> }
      </div>
    </div>
  );
}

export default SellerOrders;
