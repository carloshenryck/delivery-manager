<h1 align="center">Delivery Manager</h1>
<br/>

## 📋 Sobre
O projeto consiste em um site onde o usuário pode realizar a compra de produtos e acompanhar o seu estado, e o vendedor poderá gerenciar todos os seus pedidos recebidos

## ✨ Funcionalidades
- Login/Casdastro
- Login automático através de LocalStorage
### Fluxo Cliente
- Adicionar produtos ao carrinho
- Efetuar compra
- Listar pedidos já realizados
- Ver detalhes de cada pedido
### Fluxo Vendedor
- Visualizar pedidos recebidos
- Visualizar e alterar detalhes do pedido
### Fluxo Administrador
- Cadastrar/Excluir vendedores

### Visualize todo o fluxo do projeto no figma
[![Figma URL](https://img.shields.io/twitter/url?label=Veja%20no%20figma&logo=figma&logoColor=%234B0082&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FCzwzjVrmxmAngJy1AgvLhU%2FHiLife-Prot-Alta-Fidelidade%3Fnode-id%3D0%253A1)](https://www.figma.com/file/IAIAk2omkWcXUY8kZxMlCC/delivery-app?type=design&node-id=0%3A1&t=SuFZMEcnZxLXYPFo-1)
(Estilização em Andamento)

## 💻 Tecnologias
### Front-end
![ReactJs](https://img.shields.io/badge/React.js-0c3e6f?style=for-the-badge&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/react_router-black?style=for-the-badge&logo=react-router)
![Context API](https://img.shields.io/badge/Context_API-0c3e6f?style=for-the-badge&logo=react&logoColor=white)

### Back-end
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express)
![Sequelize](https://img.shields.io/badge/Sequelize-0C3E6F?style=for-the-badge&logo=sequelize)
![JWT](https://img.shields.io/badge/JWT-fb015b?style=for-the-badge&logo=JSONWebTokens)
![MySQL](https://img.shields.io/badge/MySQL-1C1C1C?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white)

### Testes unitários
![Mocha](https://img.shields.io/badge/Mocha-825f40?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-99070b?style=for-the-badge&logo=chai&logoColor=white)
![Sinon](https://img.shields.io/badge/Sinon-97c89b?style=for-the-badge&logo=sinon.js&logoColor=white)
![RTL](https://img.shields.io/badge/react_testing_library-b31413?style=for-the-badge&logo=rtl)

## 📦 Rodando o projeto

Instale as dependências gerais
```bash
npm i
```
Instale as dependências de front e back
```bash
npm run dev:prestart
```
Caso você não tenha MySQL instalado em seu computador, você pode utilizar o docker com os seguintes comandos
```bash
OBS: você precisa do docker-compose instalado
cd back-end
docker-compose up -d
```
Popule o banco de dados
```bash
cd back-end
npm run db:reset
```
Rode o servidor back-end
```bash
cd back-end
npm run dev
```
Rode o servidor front-end
```bash
cd front-end
npm start
```
<details>
<summary>Contas testes para utilizar:</summary>

#### Administrador: 
**email**: adm@deliveryapp.com<br>
**senha**: --adm2@21!!--
  
 #### Vendedor: 
**email**: fulana@deliveryapp.com<br>
**senha**: fulana@123
  
 #### Cliente: 
**email**: zebirita@email.com<br>
**senha**: '$#zebirita#$'
</details>

## 👨‍💻 Contribuidores
<table>
  <tr>
    <td align="center"><a href="https://github.com/CarlosHenryck" target="_blank" ><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/58481753?v=4s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4" width="100px;" alt=""/><br /><sub><b>Carlos Henryck</b></sub></a> <br><br/>
    <td align="center"><a href="https://github.com/lobotelho22" target="_blank" ><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/99725896?v=4" width="100px;" alt=""/><br /><sub><b>Eduardo Santos</b></sub></a><br><br/>
</td>
<td align="center"><a href="https://github.com/Brayan-23" target="_blank" ><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102385287?v=4" width="100px;" alt=""/><br /><sub><b>Brayan Santos</b></sub></a><br><br/>
</td>
 <td align="center"><a href="https://github.com/davidrmachado" target="_blank" ><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102385665?v=4" width="100px;" alt=""/><br /><sub><b>David Machado</b></sub></a><br><br/>
<td align="center"><a href="https://github.com/Eduferreiragit" target="_blank" ><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98242726?v=4" width="100px;" alt=""/><br /><sub><b>Eduardo Ferreira</b></sub></a><br><br/>
</td>
  </tr>
</table>
