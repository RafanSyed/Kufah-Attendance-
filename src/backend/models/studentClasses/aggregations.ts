import StudentClassModel from "./models";

export class StudentClass {
  constructor(
    public id: number,
    public class_id: number,
    public student_id: number,
    public in_person: boolean,
    public online: boolean,
    public recording: boolean,
    public absent: boolean
  ) {}
}

export const populateStudentClass = (sc: any): StudentClass => {
  return new StudentClass(
    sc.id,
    sc.class_id,
    sc.student_id,
    sc.in_person,
    sc.online,
    sc.recording,
    sc.absent
  );
};
