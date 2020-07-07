// import * as Sequelize from 'sequelize'
// import IBaseModel from '../interfaces/IBaseModel'
// import IModel from '../interfaces/IModel'
//
export interface IAdventureAttributes {
  id: number
  questId: number
  userId: number
  createdAt?: string
  updatedAt?: string
}
//
// export interface IAdventureInstance extends Sequelize.Instance<IAdventureAttributes> {
// }
//
// export interface IAdventureModel extends IBaseModel, Sequelize.Model<IAdventureInstance, IAdventureAttributes> {
// }
//
// export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): IAdventureModel => {
//   const adventure: IAdventureModel = sequelize.define(
//     'adventure',
//     {
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       userId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false
//       },
//       questId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false
//       }
//     }, {
//       tableName: 'adventure'
//
//     })
//
//   // adventure.associate = (models: IModel): void => {
//   //   adventure.belongsTo(models.User, {
//   //     foreignKey: {
//   //       allowNull: false,
//   //       field: 'userId'
//   //     }
//   //   })
//   //
//   //   adventure.belongsTo(models.Quest, {
//   //     foreignKey: {
//   //       allowNull: false,
//   //       field: 'questId'
//   //     }
//   //   })
//   // }
//
//   return adventure
// }
