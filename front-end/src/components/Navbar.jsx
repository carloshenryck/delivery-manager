import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);
  }, []);

  return (
    <nav className="navbar max-w-screen-2xl">
      <Link
        data-testid="customer_products__element-navbar-link-products"
        to="/customer/products"
      >
        Produtos
      </Link>
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to="/orders"
      >
        Meus Pedidos
      </Link>
      <div
        className="username_div"
        data-testid="customer_products__element-navbar-user-full-name"
        to="/userProfile"
      >
        { userName }
      </div>
      <Link
        data-testid="customer_products__element-navbar-link-logout"
        to="/login"
      >
        Sair
      </Link>
    </nav>
  );
}

export default Navbar;
