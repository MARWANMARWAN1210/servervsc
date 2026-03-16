"use strict";
/**
 * This file contains all the logic for the doctors controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorsController = void 0;
const express_1 = require("express");
const guards_1 = require("../utils/guards");
const doctors_mapper_1 = require("../mappers/doctors.mapper");
const logger_service_1 = require("../services/logger.service");
const doctors_service_1 = require("../services/doctors.service");
const auth_service_1 = require("../services/auth.service");
exports.doctorsController = (0, express_1.Router)();
// This is a static mock array of doctors
console.log("ok");
const doctors = [
    { id: 1, firstName: "Jules", lastName: "Valles", speciality: "Cardiologue" },
    { id: 2, firstName: "Safouane", lastName: "Van Brussels", speciality: "General Practicien" },
];
/**
 * This function returns all the doctors
 */
exports.doctorsController.get("/", (req, res) => {
    logger_service_1.LoggerService.info('GET /doctors');
    const specialityValue = req.query.speciality;
    const filter = {};
    if ((0, guards_1.isString)(specialityValue)) {
        filter.speciality = specialityValue;
    }
    const results = doctors_service_1.DoctorService.getAll(filter);
    const resultsDTO = [];
    for (let i = 0; i < results.length; i++)
        resultsDTO.push(doctors_mapper_1.DoctorsMapper.toDTO(results[i]));
    res.status(200).json(resultsDTO);
});
// fonction qui retourne les docteurs grace à l'id
exports.doctorsController.get("/:id", (req, res) => {
    logger_service_1.LoggerService.info('GET /doctors/:id');
    const id = Number(req.params.id);
    if (!(0, guards_1.isNumber)(id)) {
        logger_service_1.LoggerService.error('GET ID invalide : ' + JSON.stringify(req.params));
        res.status(400).send('ID must be a number');
        return;
    }
    for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].id === id) {
            res.json(doctors[i]).status(200);
            return;
        }
    }
    logger_service_1.LoggerService.error('GET DOCTOR invalide :' + id);
    res.status(404).send("Doctor not found");
});
doctors.push({
    id: 3,
    firstName: "Paolo",
    lastName: "Sanchez",
    speciality: "pulmonologist"
});
exports.doctorsController.post("/", (req, res) => {
    logger_service_1.LoggerService.info('POST /doctors');
    const newDoctorDTO = req.body;
    if (!(0, guards_1.isNewDoctor)(newDoctorDTO)) {
        logger_service_1.LoggerService.error('POST Invalide : ' + JSON.stringify(req.body));
        res.status(400).send("Info pas bonnes ");
        return;
    }
    const newDoctor = doctors_mapper_1.DoctorsMapper.fromNewDTO(newDoctorDTO);
    const doctor = {
        id: doctors.length + 1,
        firstName: newDoctorDTO.firstName,
        lastName: newDoctorDTO.lastName,
        speciality: newDoctorDTO.speciality
    };
    doctors.push(doctor);
    res.status(201).send(doctors_mapper_1.DoctorsMapper.toDTO(doctor));
});
exports.doctorsController.put("/:id", (req, res) => {
    logger_service_1.LoggerService.info('PUT /doctors/:id');
    const updatedDoctordDTO = req.body;
    if (!(0, guards_1.isDoctor)(updatedDoctordDTO)) {
        logger_service_1.LoggerService.error("PUT doctor invalide: " + JSON.stringify(req.body));
        return res.status(400).send("info pas bonnes");
    }
    const idParam = Number(req.params.id);
    if (!(0, guards_1.isNumber)(idParam)) {
        logger_service_1.LoggerService.error('PUT ID doctor invalide: ' + JSON.stringify(req.params.id));
        return res.status(400).send("pas un nombre");
    }
    const idBodiii = Number(req.body.id);
    if (idBodiii != idParam) {
        logger_service_1.LoggerService.error('PUT ID Doctor invalide: ' + JSON.stringify(req.body.id));
        return res.status(400).send("Pas les memes id");
    }
    let doctorIndex = -1;
    for (let i = 0; i < doctors.length; i++) {
        if (updatedDoctordDTO.id === doctors[i].id) {
            doctorIndex = i;
            break;
        }
    }
    if (doctorIndex === -1) {
        logger_service_1.LoggerService.error('PUT ID DOctor invalide: ' + JSON.stringify(doctorIndex));
        return res.status(404).send("Docor no found");
    }
    doctors[doctorIndex] = updatedDoctordDTO;
    res.status(200).send(doctors_mapper_1.DoctorsMapper.toDTO(updatedDoctordDTO));
});
exports.doctorsController.delete("/:id", auth_service_1.AuthService.authorize, (req, res) => {
    logger_service_1.LoggerService.info('DELETE /doctors/:id');
    const idParam = Number(req.params.id);
    if (!(0, guards_1.isNumber)(idParam)) {
        logger_service_1.LoggerService.error('DELETE ID invalide : ' + JSON.stringify(req.params.id));
        return res.status(400).send("Id n'es pas un hombre");
    }
    let doctorIndex = -1;
    for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].id === idParam) {
            doctorIndex = i;
            break;
        }
    }
    if (doctorIndex === -1) {
        logger_service_1.LoggerService.error('DELETE ID invalide: ' + JSON.stringify(doctorIndex));
        res.status(404).send("Docor no found");
        return;
    }
    doctors.splice(doctorIndex, 1);
    res.status(200).send();
});
