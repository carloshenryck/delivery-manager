import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import AdminNavbar from '../../components/AdminNavbar';
import { validateEmail, validatePassword } from '../../utils/verifyInputData';
import api from '../../utils/apiURL';

function Manage() {
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [adminName, setAdminName] = useState('');
  const [users, setUsers] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const { token } = userInfo;

  const validateName = () => {
    const minNameLength = 12;
    return inputName.length >= minNameLength;
  };

  const fetchUsers = async () => {
    const response = await api.get('/user');
    setUsers(response.data);
  };

  const register = async () => {
    try {
      await api.post(
        '/register/adm',
        {
          name: inputName,
          email: inputEmail,
          password: inputPassword,
          role: selectedRole,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setInputEmail('');
      setInputName('');
      setInputPassword('');
      setSelectedRole('');
      fetchUsers();
    } catch (err) {
      setErrorMessage('Erro no cadastro');
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(
        `user/${id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (validateEmail(inputEmail)
        && validatePassword(inputPassword)
        && validateName()
        && selectedRole !== ''
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEmail, inputPassword, inputName, selectedRole]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('user'));
    setAdminName(admin.name);
    fetchUsers();
  }, []);

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto px-[10%] mb-12">
      <AdminNavbar />
      <p className="text-2xl sm:text-3xl font-light mt-10">
        Bem vindo,
        {' '}
        <br className="block sm:hidden " />
        <span className="font-medium">{ adminName }</span>
      </p>
      <p className="text-lg sm:text-2xl font-light mt-10 sm:mt-16">
        Cadastre um novo usuário
      </p>
      <form className="flex flex-col md:flex-row flex-wrap gap-4 mt-10">
        <label className="flex flex-col gap-4 grow" htmlFor="name-input">
          Nome
          <input
            className="h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg w-full"
            data-testid="admin_manage__input-name"
            id="name-input"
            type="text"
            value={ inputName }
            onChange={ (e) => setInputName(e.target.value) }
          />
        </label>
        <label className="flex flex-col gap-4 grow" htmlFor="email-input">
          Email
          <input
            className="h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg w-full"
            data-testid="admin_manage__input-email"
            id="email-input"
            type="text"
            value={ inputEmail }
            onChange={ (e) => setInputEmail(e.target.value) }
          />
        </label>
        <label className="flex flex-col gap-4 grow" htmlFor="password-input">
          Senha
          <input
            className="h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg w-full"
            data-testid="admin_manage__input-password"
            id="password-input"
            type="password"
            value={ inputPassword }
            onChange={ (e) => setInputPassword(e.target.value) }
          />
        </label>
        <label className="flex flex-col gap-4 grow lg:max-w-[32.5%]" htmlFor="role">
          Tipo
          <select
            className="h-10 border-2
            outline-2 outline-[#a0a0a0] pl-4 pr-10 rounded-lg w-full"
            data-testid="admin_manage__select-role"
            id="role"
            value={ selectedRole }
            onChange={ (e) => setSelectedRole(e.target.value) }
          >
            <option defaultValue value="">Escolha uma categoria</option>
            <option value="seller">Vendedor</option>
            <option value="customer">Consumidor</option>
          </select>
        </label>
        <div data-testid="admin_manage__element-invalid-register">{errorMessage}</div>
      </form>
      <button
        type="button"
        className="w-full sm:w-fit bg-[#FCE457]
        hover:bg-[#ffed89] disabled:opacity-50
        transition-colors rounded-md px-0 sm:px-20 py-3
        text-[#564E22] font-medium mt-5"
        data-testid="admin_manage__button-register"
        disabled={ isDisabled }
        onClick={ register }
      >
        Cadastrar
      </button>

      <p className="text-lg sm:text-2xl font-light mt-10 sm:mt-16">
        Lista de usuários
      </p>

      { users.length === 0
        ? <p className="mt-5">Não há usuários cadastrados</p>
        : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                className="flex justify-between
                items-center flex-row border-solid border-[1px]
              border-[#BDBDBD] rounded-lg sm:h-24 px-4 lg:px-6 py-4 gap-2"
                key={ user.id }
              >
                <div>
                  <p className="font-medium text-lg lg:text-xl">{user.name}</p>
                  <p
                    className="font-light text-sm lg:text-base
                  text-[#7E7E7E]"
                  >
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                  <button onClick={ () => deleteUser(user.id) } type="button">
                    <FiTrash className="text-red-500" />
                  </button>
                  <p
                    className="font-medium text-[#7E7E7E]
                    text-sm lg:text-base"
                  >
                    {user.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default Manage;
