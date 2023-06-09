module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(4,2),
        url_image: DataTypes.STRING,
    }, {
        underscored:true,
        timestamps: false,
    });
    return Product;
};