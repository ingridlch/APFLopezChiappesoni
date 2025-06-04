import { Alumno } from "../../modules/dashboard/modules/alumnos/models";
import { Curso } from "../../modules/dashboard/modules/cursos/models";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface Inscripcion{
  id: string;
  courseId : string;
  studentId : string;
  course?: Curso;
  student?: Alumno;
}
export interface InscripcionForm{
  courseId : string;
  studentId : string;
}
export interface InscripcionExpand extends Inscripcion {
  nombre?: string;
}