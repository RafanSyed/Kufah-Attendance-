
export class Attendance {
  constructor(
    public id: number,
    public date: Date,
    public online: boolean,
    public in_person: boolean,
    public recording: boolean,
    public absent: boolean,
    public student_id: number,
    public class_id: number
  ) {}

  public getId(): number {
    return this.id;
  }
  public getDate(): Date {
    return this.date;
  }
  public isOnline(): boolean {
    return this.online;
  }
  public isInPerson(): boolean {
    return this.in_person;
  }
  public hasRecording(): boolean {
    return this.recording;
  }
  public isAbsent(): boolean {
    return this.absent;
  }
  public getStudentId(): number {
    return this.student_id;
  }
  public getClassId(): number {
    return this.class_id;
  }
}

export const populateAttendance = (att: any): Attendance => {
  return new Attendance(
    att.id,
    att.date,
    att.online,
    att.in_person,
    att.recording,
    att.absent,
    att.student_id,
    att.class_id
  );
};
