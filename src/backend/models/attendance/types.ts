export interface AttendanceRequest {
  date: Date;
  online?: boolean;
  in_person?: boolean;
  recording?: boolean;
  absent?: boolean;
  student_id: number;
  class_id: number;
}
