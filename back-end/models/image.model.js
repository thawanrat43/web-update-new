module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("user", {
        image: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
    })

    return Product

}