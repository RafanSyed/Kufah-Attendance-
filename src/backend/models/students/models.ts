import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import CORE_DB from "../server";
import { validateStudentEmail, validateStudentPhone } from "../validation";

class StudentModel extends Model {}

StudentModel.init(
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        async isValidEmail(value: string) {
          await validateStudentEmail(value);
        },
      },
    },
    phone: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        isValidPhone(value: string) {
          validateStudentPhone(value);
        },
      },
    },
  },
  {
    sequelize: CORE_DB,
    timestamps: false,
    tableName: "students",
    modelName: "students",
  }
);

// --- Class Wrapper ---
export class Student {
  constructor(
    id: number,
    name: string,
    email: string,
    phone?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  private id: number;
  private name: string;
  private email: string;
  private phone?: string;

  public getId(): number {
    return this.id;
  }

  public getStudentName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string | undefined {
    return this.phone;
  }
}

export default StudentModel;
