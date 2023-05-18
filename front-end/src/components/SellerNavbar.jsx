import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isClosed, setIsClosed] = useState(true);

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <>
      <nav className="w-full mt-7 hidden sm:flex font-medium gap-20">
        <Link
          className="mr-auto"
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Pedidos
        </Link>
        <Link
          className="text-[#FF0000]"
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ logout }
        >
          Sair
        </Link>
      </nav>
      <button
        type="button"
        className="block sm:hidden mt-7 ml-auto text-3xl"
        onClick={ () => setIsClosed(false) }
      >
        <RxHamburgerMenu />
      </button>
      <nav
        className={ `h-screen w-full max-w-full flex flex-col font-medium
        justify-center gap-10 items-center ${isClosed ? 'hidden' : 'absolute'} 
        bg-white inset-0 z-50` }
      >
        <button
          type="button"
          className="fixed top-0 right-0 mt-7
          mr-[10%] ml-auto text-3xl"
          onClick={ () => setIsClosed(true) }
        >
          <GrClose />
        </button>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Pedidos
        </Link>
        <Link
          className="text-[#FF0000]"
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ logout }
        >
          Sair
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
