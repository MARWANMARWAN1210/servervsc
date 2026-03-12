import { NewPatient, NewPatientDTO, PatientDTO, PatientShortDTO } from "../models/patient.model";
import { Patient } from "../models/patient.model";

export class PatientsMapper {
    public static toDTO (patient: Patient): PatientDTO {
        return {
            birthDate : patient.birthDate.toISOString(),
            niss : patient.niss,
            address : patient.address,
            refDoctor : patient.refDoctor,
            firstName : patient.firstName,
            lastName : patient.lastName,
            id: patient.id

            

        };

    }
        public static toShortDTO (patient:Patient): PatientShortDTO{
            return {
                id: patient.id,
                firstName : patient.firstName,
                lastName: patient.lastName
            };
        }
        public static fromNewDTO(NewPatient:NewPatientDTO ): NewPatient{
            return{
                lastName: NewPatient.lastName,
                firstName: NewPatient.firstName,
                birthDate: new Date(NewPatient.birthDate),
                niss: NewPatient.niss,
                address : NewPatient.address,
                refDoctor: NewPatient.refDoctor,
            }
        }

    }