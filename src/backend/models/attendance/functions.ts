import AttendanceModel from "./models";
import { AttendanceRequest } from "./types";
import { populateAttendance, Attendance } from "./aggregations";

export const addAttendance = async (
  data: AttendanceRequest
): Promise<Attendance> => {
  const instance = AttendanceModel.build(data as any);
  await instance.save();
  return populateAttendance(instance.get({ plain: true }));
};

export const updateAttendance = async (
  id: number,
  updates: Partial<AttendanceRequest>
): Promise<Attendance> => {
  const record = await AttendanceModel.findByPk(id);
  if (!record) throw new Error(`Attendance with id ${id} not found`);
  await record.update(updates);
  return populateAttendance(record.get({ plain: true }));
};

export const removeAttendance = async (id: number): Promise<void> => {
  const record = await AttendanceModel.findByPk(id);
  if (!record) throw new Error(`Attendance with id ${id} not found`);
  await record.destroy();
};

export const fetchAttendanceByStudent = async (
  student_id: number
): Promise<Attendance[]> => {
  const records = await AttendanceModel.findAll({ where: { student_id } });
  return records.map((r) => populateAttendance(r.get({ plain: true })));
};

export const fetchAttendanceByClass = async (
  class_id: number
): Promise<Attendance[]> => {
  const records = await AttendanceModel.findAll({ where: { class_id } });
  return records.map((r) => populateAttendance(r.get({ plain: true })));
};

export const fetchAttendanceByDate = async (
  date: Date
): Promise<Attendance[]> => {
  const records = await AttendanceModel.findAll({ where: { date } });
  return records.map((r) => populateAttendance(r.get({ plain: true })));
};
