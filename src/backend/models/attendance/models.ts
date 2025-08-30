import { Model, DataTypes } from "sequelize";
import CORE_DB from "../server";
import { validateStudent } from "../validation";
import { validateClass } from "../validation";

class AttendanceModel extends Model {}

AttendanceModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    in_person: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recording: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    absent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async isValidStudent(value: number) {
          await validateStudent(value);
        },
      },
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async isValidClass(value: number) {
          await validateClass(value);
        },
      },
    },
  },
  {
    sequelize: CORE_DB,
    timestamps: false,
    tableName: "attendance",
    modelName: "attendance",
  }
);

export default AttendanceModel;
