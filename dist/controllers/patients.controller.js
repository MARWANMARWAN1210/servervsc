"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientsController = void 0;
const express_1 = require("express");
const guards_1 = require("../utils/guards");
const patients_mapper_1 = require("../mappers/patients.mapper");
const logger_service_1 = require("../services/logger.service");
exports.patientsController = (0, express_1.Router)();
const patients = [{
        id: 1,
        firstName: "John", lastName: "Lecarre",
        birthDate: new Date("1964-05-11"), niss: "640511-123-45",
        address: {
            street: "Rue du polar", number: "273-B",
            zipCode: "1000", city: "Bruxelles", country: "Belgique"
        },
        refDoctor: 1
    },
    {
        id: 2,
        firstName: "Gabrielle", lastName: "Garcias Marques",
        birthDate: new Date("1978-12-03"), niss: "781203-123-45",
        address: {
            street: "Rue du merveilleux", number: "57",
            zipCode: "1000", city: "Bruxelles", country: "Belgique"
        },
        refDoctor: 2
    }];
exports.patientsController.get("/", (req, res) => {
    logger_service_1.LoggerService.info("[GET] /patients/");
    const zipCode = req.query.zipCode;
    const filter = {};
    if ((0, guards_1.isString)(zipCode))
        filter.zipcode = zipCode;
    logger_service_1.LoggerService.debug(JSON.stringify(filter));
    const patientZipcodeListe = [];
    for (let i = 0; i < patients.length; i++) {
        if (!filter.zipcode || patients[i].address.zipCode === filter.zipcode)
            patientZipcodeListe.push(patients[i]);
    }
    const patientsDTO = [];
    for (const pat of patientZipcodeListe) {
        patientsDTO.push(patients_mapper_1.PatientsMapper.toDTO(pat));
    }
    res.json(patientsDTO).status(200);
});
exports.patientsController.get("/:id", (req, res) => {
    logger_service_1.LoggerService.info('GET /patients/:id');
    const id = Number(req.params.id);
    if (!(0, guards_1.isNumber)(id)) {
        logger_service_1.LoggerService.error('GET ID invalide :' + JSON.stringify(req.params.id));
        res.status(400).send("ID not valid");
        return;
    }
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].id === id) {
            res.json(patients_mapper_1.PatientsMapper.toDTO(patients[i])).status(200);
            return;
        }
        logger_service_1.LoggerService.error('GET ID Invalide:' + patients[i]);
        res.status(404).send("doctor not found");
    }
});
exports.patientsController.get("/niss/:niss", (req, res) => {
    const niss = req.params.niss;
    logger_service_1.LoggerService.info('GET /patients/niss/:niss');
    if (!(0, guards_1.isNiss)(niss)) {
        logger_service_1.LoggerService.error('GET PATIENT NISS INVALIDE :' + JSON.stringify(req.params.niss));
        res.status(400).send();
        return;
    }
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].niss === niss) {
            res.json(patients_mapper_1.PatientsMapper.toDTO(patients[i])).status(200);
            return;
        }
        logger_service_1.LoggerService.error('GET PATIENT NISS INVALIDE :' + patients[i]);
        res.status(404).send("");
    }
});
exports.patientsController.get("/:id/short", (req, res) => {
    const id = Number(req.params.id);
    logger_service_1.LoggerService.info('GET /patients/:id/short');
    if (!(0, guards_1.isNumber)(id)) {
        logger_service_1.LoggerService.error('PATIENT GET ID SHORT INVALIDE :' + JSON.stringify(req.params.id));
        res.status(400).send("ID not valid");
    }
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].id === id) {
            res.json(patients_mapper_1.PatientsMapper.toShortDTO(patients[i])).status(200);
            return;
        }
        logger_service_1.LoggerService.error('GET ID SHORT INVALIDE :' + patients[i]);
        res.status(404).send();
    }
});
exports.patientsController.get("/zipcode/:zipCode", (req, res) => {
    logger_service_1.LoggerService.info('GET /patients/zipcode/:zipcode');
    const zipCode = req.params.zipCode;
    if (!(0, guards_1.isString)(zipCode)) {
        logger_service_1.LoggerService.error('GET PATIENT ZIPCODE INVALIDE :' + JSON.stringify(req.params.zipCode));
        res.status(400).send("zipcode is not valid");
        return;
    }
    const result = [];
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].address.zipCode === zipCode)
            result.push(patients_mapper_1.PatientsMapper.toDTO(patients[i]));
    }
    res.status(200).json(result);
});
exports.patientsController.get("/doctor/:id/zipCode/:zipCode", (req, res) => {
    logger_service_1.LoggerService.info('GET /doctor/:id/zipcode/:zipcode');
    const refDoctor = Number(req.params.id);
    const zipCode = req.params.zipCode;
    if (!(0, guards_1.isNumber)(refDoctor) || !(0, guards_1.isString)(zipCode)) {
        logger_service_1.LoggerService.error('GET DOCTOR ID ZIPCODE INVALIDE :' + JSON.stringify(req.params));
        res.status(400).send("Donnée invalide");
        return;
    }
    const results = [];
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].refDoctor === refDoctor && patients[i].address.zipCode === zipCode) {
            results.push(patients_mapper_1.PatientsMapper.toDTO(patients[i]));
        }
    }
    return res.status(200).json(results);
});
exports.patientsController.post("/", (req, res) => {
    logger_service_1.LoggerService.info("POST /patients");
    const newPatientDTO = req.body;
    if (!(0, guards_1.isNewPatient)(newPatientDTO)) {
        logger_service_1.LoggerService.error('POST PATIENT INVALIDE :' + JSON.stringify(req.body));
        return res.status(400).send("Les informations fournies ne sont pas valides pour un nouveau patient.");
    }
    const newPatientData = patients_mapper_1.PatientsMapper.fromNewDTO(newPatientDTO);
    const id = patients.length + 1;
    const newPatient = {
        id: id,
        firstName: newPatientData.firstName,
        lastName: newPatientData.lastName,
        birthDate: newPatientData.birthDate,
        niss: newPatientData.niss,
        address: newPatientData.address,
        refDoctor: newPatientData.refDoctor
    };
    patients.push(newPatient);
    return res.status(201).json(patients_mapper_1.PatientsMapper.toDTO(newPatient));
});
