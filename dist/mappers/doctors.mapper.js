"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsMapper = void 0;
class DoctorsMapper {
    static toDTO(doctor) {
        return {
            speciality: doctor.speciality,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            id: doctor.id
        };
    }
    ;
    static fromNewDTO(doctor) {
        return {
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            speciality: doctor.speciality
        };
    }
    ;
    static fromDTO(doctor) {
        return {
            speciality: doctor.speciality,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            id: doctor.id
        };
    }
    static toDBO(doctor) {
        return {
            id: doctor.id,
            first_name: doctor.firstName,
            last_name: doctor.lastName,
            speciality: doctor.speciality
        };
    }
    static fromDBO(doctor) {
        return {
            speciality: doctor.speciality,
            firstName: doctor.first_name,
            lastName: doctor.last_name,
            id: doctor.id
        };
    }
}
exports.DoctorsMapper = DoctorsMapper;
