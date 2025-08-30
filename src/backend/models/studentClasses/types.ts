export interface StudentClassRequest {
  class_id: number;
  student_id: number;
  in_person?: boolean;
  online?: boolean;
  recording?: boolean;
  absent?: boolean;
}
