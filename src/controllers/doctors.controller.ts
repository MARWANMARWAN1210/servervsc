/**
 * This file contains all the logic for the doctors controller
 */

import { Request, Response, Router } from "express";
import { Doctor, DoctorDTO, DoctorFilter, NewDoctorDTO } from "../models/doctor.model";
import { isDoctor, isNewDoctor, isNumber, isString } from "../utils/guards";
import { DoctorsMapper } from "../mappers/doctors.mapper";
import { LoggerService } from "../services/logger.service";
import { json } from "stream/consumers";
import { DoctorService } from "../services/doctors.service";
import { PatientDTO } from "../models/patient.model";

export const doctorsController = Router();

// This is a static mock array of doctors
console.log("ok")
const doctors: Doctor[] = [
  {id:1, firstName: "Jules", lastName: "Valles", speciality: "Cardiologue"}, 
  {id:2, firstName: "Safouane", lastName: "Van Brussels", speciality: "General Practicien"}, 
];

/**
 * This function returns all the doctors
 */
doctorsController.get("/", (req: Request, res: Response) => {
  LoggerService.info('GET /doctors')
  const specialityValue = req.query.speciality;
  const filter : DoctorFilter = {};
  if(isString(specialityValue)){
    filter.speciality = specialityValue;
  }

  const results = DoctorService.getAll(filter); 

  const resultsDTO: DoctorDTO[] = [];
  for (let i=0; i < results.length; i++)
      resultsDTO.push(DoctorsMapper.toDTO(results[i]));

  res.status(200).json(resultsDTO)
});

// fonction qui retourne les docteurs grace à l'id
doctorsController.get("/:id",(req: Request, res:Response)=>{
  LoggerService.info('GET /doctors/:id')
  const id = Number(req.params.id);
  if(!isNumber(id)){
    LoggerService.error('GET ID invalide : ' + JSON.stringify(req.params))
    res.status(400).send('ID must be a number');
    return;
  }
  for (let i = 0; i < doctors.length; i++) {
    if(doctors[i].id === id ) {
      res.json(doctors[i]).status(200)
      return
    }
  }
    LoggerService.error('GET DOCTOR invalide :' + id )
    res.status(404).send("Doctor not found");
    
})
  
doctors.push({
  id: 3,
  firstName: "Paolo",
  lastName: "Sanchez",
  speciality: "pulmonologist"
});

doctorsController.post("/",(req:Request, res:Response)=>{
  LoggerService.info('POST /doctors');
  const newDoctorDTO:NewDoctorDTO = req.body;
  if(!isNewDoctor(newDoctorDTO)){
    LoggerService.error('POST Invalide : ' + JSON.stringify(req.body))
    res.status(400).send("Info pas bonnes ")
    return;
    
  }

  const newDoctor : NewDoctorDTO = DoctorsMapper.fromNewDTO(newDoctorDTO)
  const doctor : Doctor = {
    id:  doctors.length + 1,
    firstName: newDoctorDTO.firstName,
    lastName: newDoctorDTO.lastName,
    speciality : newDoctorDTO.speciality
 
  }
  doctors.push(doctor);
  res.status(201).send(DoctorsMapper.toDTO(doctor))
 
});



doctorsController.put("/:id",(req:Request, res:Response)=> {
  LoggerService.info('PUT /doctors/:id')
  const updatedDoctordDTO : DoctorDTO = req.body;
  if(!isDoctor(updatedDoctordDTO)){
    LoggerService.error("PUT doctor invalide: " + JSON.stringify(req.body));
    return res.status(400).send("info pas bonnes");

  }
  const idParam =Number( req.params.id)
  if(!isNumber(idParam)){
    LoggerService.error('PUT ID doctor invalide: ' + JSON.stringify(req.params.id))
   return res.status(400).send("pas un nombre")
  }
  const idBodiii = Number(req.body.id)
  if(idBodiii != idParam){
    LoggerService.error('PUT ID Doctor invalide: ' + JSON.stringify(req.body.id))
    return res.status(400).send("Pas les memes id")
  }
  let doctorIndex = -1;
  for (let i= 0; i < doctors.length; i++) {
    if(updatedDoctordDTO.id === doctors[i].id){
      doctorIndex = i;
        break;
    }
   
    
  }
  if(doctorIndex === -1){
    LoggerService.error('PUT ID DOctor invalide: ' + JSON.stringify(doctorIndex))
    return res.status(404).send("Docor no found")
  }
  doctors[doctorIndex] = updatedDoctordDTO;
  res.status(200).send(DoctorsMapper.toDTO(updatedDoctordDTO))

})

doctorsController.delete("/:id",(req:Request, res:Response)=>{
  LoggerService.info('DELETE /doctors/:id')
  const idParam = Number(req.params.id)
  if(!isNumber(idParam)){
    LoggerService.error('DELETE ID invalide : ' + JSON.stringify(req.params.id))
    return res.status(400).send("Id n'es pas un hombre")
  }

  let doctorIndex = -1;
  for (let i = 0; i < doctors.length; i++) {
    if(doctors[i].id === idParam){
      doctorIndex = i;
      break;
    }
    
  }
  if(doctorIndex === -1){
    LoggerService.error('DELETE ID invalide: '+ JSON.stringify(doctorIndex))
    res.status(404).send("Docor no found")
    return;
  }
  doctors.splice(doctorIndex, 1)
  res.status(200).send()
})