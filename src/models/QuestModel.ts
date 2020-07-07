// import * as Sequelize from 'sequelize'
// import IBaseModel from '../interfaces/IBaseModel'
//
export interface IQuestAttributes {
  id: number
  title: string
  description: string
  createdAt?: string
  updatedAt?: string
}
//
// export interface IQuestInstance extends Sequelize.Instance<IQuestAttributes> {
//
// }
//
// export interface IQuestModel extends IBaseModel, Sequelize.Model<IQuestInstance, IQuestAttributes> {
//
// }
//
// export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): IQuestModel => {
//   const quest: IQuestModel = sequelize.define(
//     'quest',
//     {
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       title: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//       },
//       description: {
//         type: DataTypes.STRING(255),
//         allowNull: true
//       }
//     }, {
//       tableName: 'quest'
//     }
//   )
//
//   return quest
// }
