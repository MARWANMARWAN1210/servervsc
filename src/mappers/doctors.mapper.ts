import { Doctor, DoctorDTO, NewDoctor, NewDoctorDTO,DoctorDBO } from "../models/doctor.model";

export  class DoctorsMapper {
    public static toDTO (doctor : Doctor) : DoctorDTO {
        return {
            speciality : doctor.speciality,
            firstName: doctor.firstName,
            lastName : doctor.lastName,
            id : doctor.id

        }
    };


    public static fromNewDTO (doctor : NewDoctorDTO) : NewDoctor {
        return {
             firstName : doctor.firstName,
             lastName : doctor.lastName,
             speciality : doctor.speciality


        }
        
    };
    public static fromDTO(doctor : DoctorDTO) : Doctor {
        return {
            speciality : doctor.speciality,
            firstName : doctor.firstName,
            lastName : doctor.lastName,
            id : doctor.id
        }
    }
    public static toDBO (doctor:Doctor) : DoctorDBO {
        return {
            id : doctor.id,
            first_name : doctor.firstName,
            last_name: doctor.lastName, 
            speciality : doctor.speciality
        }
    }
    public static fromDBO(doctor : DoctorDBO) : Doctor {
        return {
            speciality : doctor.speciality,
            firstName : doctor.first_name, 
            lastName : doctor.last_name,
            id : doctor.id
        }
    }
}