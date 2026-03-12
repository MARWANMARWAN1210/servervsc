import { log } from "console";
import { DoctorsMapper } from "../mappers/doctors.mapper";
import { Doctor, DoctorDBO, DoctorFilter, NewDoctor } from "../models/doctor.model";
import { FilesService } from "./files.service";
import { LoggerService } from "./logger.service";

export class DoctorService {
    public static getAll(filter: DoctorFilter) : Doctor[] {
        const results : Doctor [] = [];
        let allDoctors: DoctorDBO[] = [];
        try {
         allDoctors = FilesService.readFile<DoctorDBO>("data/doctors.json")             
        } catch (error) {
            LoggerService.error(error)
            return [];
        }

       for (let i = 0; i < allDoctors.length; i++) {
        if(!filter.speciality || allDoctors[i].speciality === filter.speciality)
        results.push(DoctorsMapper.fromDBO(allDoctors[i]))
       
    }
            
        return results;
    }

    
    public static getByID (id : number) : Doctor | undefined{

    const allDoctors = FilesService.readFile<DoctorDBO>("data/doctors.json")

    for (let i = 0; i < allDoctors.length; i++) {
        if(allDoctors[i].id === id)
            return DoctorsMapper.fromDBO(allDoctors[i])
        
    }

    return undefined;
                           
    }

  
}