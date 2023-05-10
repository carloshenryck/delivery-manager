import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if (isClosed) {
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }, [isClosed]);

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav className="w-full px-[10%] mt-7 2xl:mx-auto max-w-screen-2xl">
      <div className="hidden sm:flex font-medium gap-20">
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          <p>Produtos</p>
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
          className="mr-auto"
        >
          <p>Meus Pedidos</p>
        </Link>
        <Link
          className="text-[#FF0000]"
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ logout }
        >
          <p>Sair</p>
        </Link>
      </div>
      <button
        type="button"
        className="block sm:hidden ml-auto text-3xl"
        onClick={ () => setIsClosed(false) }
      >
        <RxHamburgerMenu />
      </button>
      <div
        className={ `h-screen w-full max-w-full flex flex-col font-medium
        justify-evenly items-center ${isClosed ? 'hidden' : 'absolute'} 
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
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          <p>Produtos</p>
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          <p>Meus Pedidos</p>
        </Link>
        <Link
          className="text-[#FF0000]"
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ logout }
        >
          <p>Sair</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
