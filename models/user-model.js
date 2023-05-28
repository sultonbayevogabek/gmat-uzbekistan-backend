export default function (Sequelize, sequelize) {
   return sequelize.define('users', {
      id: {
         type: Sequelize.DataTypes.UUID,
         defaultValue: Sequelize.DataTypes.UUIDV4,
         primaryKey: true
      },
      name: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      password: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      role: {
         type: Sequelize.DataTypes.STRING(5),
         isIn: [['user', 'admin']],
         defaultValue: 'user'
      },
      avatar: {
         type: Sequelize.DataTypes.STRING,
         allowNull: true
      }
   })
}