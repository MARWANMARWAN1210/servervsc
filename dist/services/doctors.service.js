"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const doctors_mapper_1 = require("../mappers/doctors.mapper");
const files_service_1 = require("./files.service");
const logger_service_1 = require("./logger.service");
class DoctorService {
    static getAll(filter) {
        const results = [];
        let allDoctors = [];
        try {
            allDoctors = files_service_1.FilesService.readFile("data/doctors.json");
        }
        catch (error) {
            logger_service_1.LoggerService.error(error);
            return [];
        }
        for (let i = 0; i < allDoctors.length; i++) {
            if (!filter.speciality || allDoctors[i].speciality === filter.speciality)
                results.push(doctors_mapper_1.DoctorsMapper.fromDBO(allDoctors[i]));
        }
        return results;
    }
    static getByID(id) {
        const allDoctors = files_service_1.FilesService.readFile("data/doctors.json");
        for (let i = 0; i < allDoctors.length; i++) {
            if (allDoctors[i].id === id)
                return doctors_mapper_1.DoctorsMapper.fromDBO(allDoctors[i]);
        }
        return undefined;
    }
}
exports.DoctorService = DoctorService;
