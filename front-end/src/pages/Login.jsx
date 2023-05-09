/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/apiURL';
import { validateEmail, validatePassword } from '../utils/verifyInputData';
import '../css/Login.css';

function Login() {
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      const response = await api.post('/login', {
        email: inputEmail,
        password: inputPassword,
      });

      delete response.data.id;
      localStorage.setItem('user', JSON.stringify(response.data));

      if (response.data.role === 'customer') {
        history.push('/customer/products');
      }

      if (response.data.role === 'seller') {
        history.push('/seller/orders');
      }

      if (response.data.role === 'administrator') {
        history.push('/admin/manage');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    if (validateEmail(inputEmail) && validatePassword(inputPassword)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputEmail, inputPassword]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/customer/products');
    }
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3 w-5/6">
        <h1 className="text-2xl font-medium sm:text-3xl m-0">Login</h1>
        <p className="text-[#bdbdbd] text-lg sm:text-xl">
          Insira suas inforações abaixo para realizar login
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-5 w-4/5 sm:w-96">
        <label htmlFor="email-input" className="flex flex-col">
          <span className="text-[#bdbdbd] text-lg sm:text-xl">Email</span>
          <input
            className="w-full sm:w-96 h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg"
            data-testid="common_login__input-email"
            id="email-input"
            type="text"
            placeholder="email@gmail.com"
            value={ inputEmail }
            onChange={ (e) => setInputEmail(e.target.value) }
          />
        </label>

        <label htmlFor="password-input" className="flex flex-col">
          <span className="text-[#bdbdbd] text-lg sm:text-xl">Senha</span>
          <input
            className="w-full h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg"
            data-testid="common_login__input-password"
            id="password-input"
            type="password"
            placeholder="••••••••"
            value={ inputPassword }
            onChange={ (e) => setInputPassword(e.target.value) }
          />
        </label>
      </div>

      <div
        className="button_container flex flex-col
        mt-28 sm:mt-16 items-center w-4/5 sm:w-96"
      >
        <button
          className="bg-[#FCE457] w-full h-10 rounded-lg font-medium text-lg sm:text-xl
          hover:bg-[#fce357a5] transition-colors"
          type="button"
          data-testid="common_login__button-login"
          disabled={ isDisabled }
          onClick={ login }
        >
          Entrar
        </button>
        <div className="mt-5 whitespace-nowrap">
          <span className="text-[#bdbdbd] text-sm sm:text-base">
            Não tem uma conta ?
            {' '}
          </span>
          <button
            type="button"
            className="text-sm sm:text-base"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/register') }
          >
            Cadastre-se.
          </button>
        </div>
      </div>
      <div
        className="warning"
        data-testid="common_login__element-invalid-email"
      >
        {errorMessage}
      </div>
    </div>
  );
}

export default Login;
