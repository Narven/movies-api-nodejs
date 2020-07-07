// import * as Sequelize from 'sequelize'
// import IBaseModel from '../interfaces/IBaseModel'
// import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
// // import IModel from '../interfaces/IModel'
//
export interface IUserAttributes {
  id?: number
  name?: string
  email?: string
  password?: string
  image?: string
  createdAt?: string
  updatedAt?: string
}
//
// // @ts-ignore
// export interface IUserInstance extends Sequelize.Instance<IUserAttributes>, IUserAttributes {
//   isPassword(encodedPassword: string, password: string): boolean
// }
//
// export interface IUserModel extends IBaseModel, Sequelize.Model<IUserInstance, IUserAttributes> {
// }
//
// export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): IUserModel => {
//   const user: IUserModel = sequelize.define(
//     'User',
//     {
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       firstName: {
//         type: DataTypes.STRING(80),
//         allowNull: true
//       },
//       lastName: {
//         type: DataTypes.STRING(80),
//         allowNull: true
//       },
//       email: {
//         type: DataTypes.STRING(128),
//         allowNull: false,
//         unique: true
//       },
//       password: {
//         type: DataTypes.STRING(128),
//         allowNull: false,
//         validate: {
//           notEmpty: true
//         }
//       },
//       image: {
//         type: DataTypes.TEXT,
//         allowNull: true
//       }
//     }, {
//       tableName: 'user',
//       hooks: {
//         beforeCreate(u: IUserInstance, _options: Sequelize.CreateOptions): void {
//           const salt = genSaltSync()
//           u.password = hashSync(u.password!, salt)
//         }
//       }
//     })
//
//   user.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
//     return compareSync(password, encodedPassword)
//   }
//
//   // user.associate = (models: IModel): void => {
//   //   user.hasMany(models.Adventure, {
//   //     foreignKey: 'userId'
//   //   })
//   // }
//
//   return user
// }
