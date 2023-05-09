const models = require('../index');

const SALE = 'sale_id';
const PRODUCT = 'product_id';

const obj = (address, user, sellerId) => ({
    userId: user.id,
    sellerId,
    totalPrice: address.totalPrice,
    deliveryAddress: address.deliveryAddress,
    deliveryNumber: address.deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
});

const create = async (objInfo, user) => {
    const { dataValues } = await models.User.findOne({ where: { id: objInfo.sellerId } });
    const newObj = obj(objInfo, user, Number(dataValues.id)); 
    const { dataValues: { id } } = await models.Sale.create({ ...newObj });
    return Number(id);
};

const findOne = async (column, search) => {
    const { dataValues: { id } } = await models.Product.findOne({ where: { [column]: search } });
    return Number(id);
};

const createSale = async (objInfo, user) => {
    const saleId = await create(objInfo, user);
    const map = objInfo.products.map(async (elem) => {
    const productId = await findOne('name', elem.name);
    await models.SaleProduct.create({ 
        [SALE]: saleId, [PRODUCT]: productId, quantity: Number(elem.quantity) });
    });
    await Promise.all(map);
    return saleId;
};

const sellers = async () => {
    const vendedores = await models.User
    .findAll({ where: { role: 'seller' }, attributes: { exclude: ['password'] } });
    return vendedores;
};

const salesProdutcts = async () => {
    const salesAndProducts = await models.Sale.findAll({
        attributes: { exclude: ['user_id', 'seller_id', 'sellerId', 'userId'] },
        include: [
            { model: models.User, as: 'seller', attributes: { exclude: ['password', 'email'] } },
            { model: models.Product, as: 'products', through: { attributes: ['quantity'] } },
        ], 
    });
    return salesAndProducts;
};

const salesProdutctsId = async (id) => {
    const salesAndProducts = await models.Sale.findOne({
        where: { id },
        attributes: { exclude: ['user_id', 'seller_id', 'sellerId', 'userId'] },
        include: [
            { model: models.User, as: 'seller', attributes: { exclude: ['password', 'email'] } },
            { model: models.Product, as: 'products', through: { attributes: ['quantity'] } },
        ], 
    });
    return salesAndProducts;
};

const allSales = async () => models.Sale.findAll({
    attributes: { exclude: ['user_id', 'seller_id', 'userId', 'sellerId'] },
});

const update = async ({ status }, id) => {
    const updated = await models.Sale.update({ status }, { where: { id } });
    return updated;
};

module.exports = { 
    createSale, 
    sellers, 
    salesProdutcts,
    salesProdutctsId,
    allSales,
    update 
};
