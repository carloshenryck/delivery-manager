import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

function Navbar() {
  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav className="w-full px-[10%] mt-7">
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
      <button type="button" className="block sm:hidden ml-auto text-3xl">
        <RxHamburgerMenu />
      </button>
    </nav>
  );
}

export default Navbar;
