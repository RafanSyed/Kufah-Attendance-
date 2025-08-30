import { Model, DataTypes } from "sequelize";
import CORE_DB from "../server";
import ClassModel from "../classes/models";
import StudentModel from "../students/models";

class StudentClassModel extends Model {}

StudentClassModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ClassModel,
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StudentModel,
        key: "id",
      },
    },
    in_person: { type: DataTypes.BOOLEAN, defaultValue: false },
    online: { type: DataTypes.BOOLEAN, defaultValue: false },
    recording: { type: DataTypes.BOOLEAN, defaultValue: false },
    absent: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize: CORE_DB,
    timestamps: false,
    tableName: "student_classes",
    modelName: "student_classes",
  }
);

export default StudentClassModel;
