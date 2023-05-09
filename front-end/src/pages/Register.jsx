/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/verifyInputData';
import api from '../utils/apiURL';
import '../css/Register.css';

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

      history.push('/customer/products');
    } catch (err) {
      console.log(err);
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
    <div className="register_container">
      <div className="img_container">
        <img src={ logoCopoCheio } alt="logotipo Copo Cheio" className="logo" />
      </div>
      <label htmlFor="name-input">
        <input
          data-testid="common_register__input-name"
          id="name-input"
          type="text"
          placeholder="Nome"
          value={ inputName }
          onChange={ (e) => setInputName(e.target.value) }
        />
      </label>
      <label htmlFor="email-input">
        <input
          data-testid="common_register__input-email"
          id="email-input"
          type="text"
          placeholder="E-mail"
          value={ inputEmail }
          onChange={ (e) => setInputEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          data-testid="common_register__input-password"
          id="password-input"
          type="password"
          placeholder="Senha"
          value={ inputPassword }
          onChange={ (e) => setInputPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        className="register-btn"
        data-testid="common_register__button-register"
        disabled={ isDisabled }
        onClick={ register }
      >
        Cadastrar
      </button>
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
