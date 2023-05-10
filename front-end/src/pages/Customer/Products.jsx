import { useState, useEffect } from 'react';
import ItemCard from '../../components/ItemCards';
import Navbar from '../../components/CustomerNavbar';
import Total from '../../components/Total';

function Products() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);
  }, []);

  return (
    <div>
      <Navbar />
      <div
        data-testid="customer_products__element-navbar-user-full-name"
        className="mt-10 pl-[10%]"
      >
        <p className="text-2xl sm:text-3xl font-light">
          Bem vindo,
          {' '}
          <br className="block sm:hidden " />
          <span className="font-medium">{ userName }</span>
        </p>
      </div>
      <ItemCard />
      <footer>
        <Total />
      </footer>
    </div>
  );
}

export default Products;
