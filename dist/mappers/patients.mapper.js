"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsMapper = void 0;
class PatientsMapper {
    static toDTO(patient) {
        return {
            birthDate: patient.birthDate.toISOString(),
            niss: patient.niss,
            address: patient.address,
            refDoctor: patient.refDoctor,
            firstName: patient.firstName,
            lastName: patient.lastName,
            id: patient.id
        };
    }
    static toShortDTO(patient) {
        return {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName
        };
    }
    static fromNewDTO(NewPatient) {
        return {
            lastName: NewPatient.lastName,
            firstName: NewPatient.firstName,
            birthDate: new Date(NewPatient.birthDate),
            niss: NewPatient.niss,
            address: NewPatient.address,
            refDoctor: NewPatient.refDoctor,
        };
    }
}
exports.PatientsMapper = PatientsMapper;
