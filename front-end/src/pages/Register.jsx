/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/verifyInputData';
import api from '../utils/apiURL';

function Register() {
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const validateName = () => {
    const minNameLength = 12;
    return inputName.length >= minNameLength;
  };

  const register = async () => {
    try {
      await api.post('/register', {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      });

      const response = await api.post('/login', {
        email: inputEmail,
        password: inputPassword,
      });

      delete response.data.id;
      localStorage.setItem('user', JSON.stringify(response.data));
      history.push('/customer/products');
    } catch (err) {
      setErrorMessage('Erro no cadastro');
    }
  };

  useEffect(() => {
    if (validateEmail(inputEmail) && validatePassword(inputPassword) && validateName()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputEmail, inputPassword, inputName]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3 w-5/6">
        <h1 className="text-2xl font-medium sm:text-3xl m-0">Cadastro</h1>
        <p className="text-[#bdbdbd] text-lg sm:text-xl">
          Insira suas informações abaixo para se cadastrar
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-5 w-4/5 sm:w-96">
        <label htmlFor="password-input" className="flex flex-col">
          <span className="text-lg sm:text-xl">Nome</span>
          <input
            className="w-full h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg"
            data-testid="common_register__input-name"
            id="name-input"
            type="text"
            placeholder="Seu nome"
            value={ inputName }
            onChange={ (e) => setInputName(e.target.value) }
          />
        </label>

        <label htmlFor="email-input" className="flex flex-col">
          <span className="text-lg sm:text-xl">Email</span>
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
          <span className="text-lg sm:text-xl">Senha</span>
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
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ register }
        >
          Cadastrar
        </button>
        <div className="mt-5 whitespace-nowrap">
          <span className="text-[#bdbdbd] text-base">
            Já possui uma conta ?
            {' '}
          </span>
          <button
            type="button"
            className="text-base"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/login') }
          >
            Login.
          </button>
        </div>
      </div>

      <div
        className="warningRegister"
        data-testid="common_register__element-invalid_register"
      >
        {errorMessage}
      </div>
    </div>
  );
}

export default Register;
