import { Interface } from "readline";
import { Person } from "./person.model";
import { DoctorsMapper } from "../mappers/doctors.mapper";

export interface Doctor extends Person {
  speciality: string;
}

export interface DoctorDTO extends Person{
  speciality: string;
}

export interface NewDoctorDTO {
  firstName : string;
  lastName: string;
  speciality: string;
}

export interface NewDoctor{
  firstName : string;
  lastName : string;
  speciality : string;


}

export interface DoctorFilter {
  speciality ?: string;

}
export interface DoctorDBO {
  id: number;
  first_name: string;
  last_name: string
  speciality: string;

}