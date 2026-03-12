import { Router, Request, Response} from "express";
import { NewPatientDTO, Patient, PatientDTO, PatientFilter } from "../models/patient.model";
import { isNewPatient, isNiss, isNumber, isString } from "../utils/guards";
import { PatientsMapper } from "../mappers/patients.mapper";
import { LoggerService } from "../services/logger.service";

export const patientsController = Router();

const patients  : Patient[] = [{
    id: 1,
    firstName: "John",lastName: "Lecarre",
    birthDate: new Date("1964-05-11"), niss:"640511-123-45",
    address: {
        street: "Rue du polar",number: "273-B",
        zipCode: "1000", city: "Bruxelles", country: "Belgique"
    },
    refDoctor: 1
},
{
    id: 2,
    firstName: "Gabrielle", lastName: "Garcias Marques",
    birthDate: new Date ("1978-12-03"), niss: "781203-123-45",
    address: {
        street : "Rue du merveilleux", number: "57",
        zipCode: "1000",city : "Bruxelles", country :"Belgique"
    },
    refDoctor: 2

}];



patientsController.get("/", (req:Request, res:Response)=>{
    LoggerService.info("[GET] /patients/")
    const zipCode = req.query.zipCode;
    const filter: PatientFilter = {}
  
    if(isString(zipCode))
        filter.zipcode = zipCode;

    LoggerService.debug(JSON.stringify(filter));
    
    const patientZipcodeListe : Patient [] = []
    for (let i = 0; i < patients.length; i++) {
        if(!filter.zipcode || patients[i].address.zipCode === filter.zipcode)
            patientZipcodeListe.push(patients[i])
        
    }

    const patientsDTO : PatientDTO [] = [];
    for (const pat of patientZipcodeListe) {
        patientsDTO.push(PatientsMapper.toDTO(pat))
    }
    res.json(patientsDTO).status(200)

})





patientsController.get("/:id",(req:Request, res: Response)=>{
    LoggerService.info('GET /patients/:id')
const id = Number(req.params.id)
if(!isNumber(id)){
    LoggerService.error('GET ID invalide :' + JSON.stringify(req.params.id))
    res.status(400).send("ID not valid")
    return;
}

for (let i = 0; i < patients.length; i++) {

     if(patients[i].id === id){
        res.json(PatientsMapper.toDTO(patients[i])).status(200);
    return;}
    LoggerService.error('GET ID Invalide:' + patients[i])
res.status(404).send("doctor not found");
}

})






patientsController.get("/niss/:niss",(req:Request, res:Response)=>{
    const niss = req.params.niss;
    LoggerService.info('GET /patients/niss/:niss')
    if(!isNiss(niss)){
        LoggerService.error('GET PATIENT NISS INVALIDE :'+ JSON.stringify(req.params.niss))
        res.status(400).send();
        return;
    }

    
    for (let i = 0; i < patients.length; i++) {
        if(patients[i].niss === niss)
{            res.json(PatientsMapper.toDTO(patients[i])).status(200);
            return;
} 
LoggerService.error('GET PATIENT NISS INVALIDE :' + patients[i])
res.status(404).send("");

    }

})




patientsController.get("/:id/short",(req:Request, res:Response)=>{
    const id = Number(req.params.id)
    LoggerService.info('GET /patients/:id/short')
    if (!isNumber(id)){
        LoggerService.error('PATIENT GET ID SHORT INVALIDE :' + JSON.stringify(req.params.id))
        res.status(400).send("ID not valid")
    }
    for (let i = 0; i < patients.length; i++) {
        if(patients[i].id === id)
        {           
            res.json(PatientsMapper.toShortDTO(patients[i])).status(200);
            return;
    }
    LoggerService.error('GET ID SHORT INVALIDE :' + patients[i])
    res.status(404).send();
}
})





patientsController.get("/zipcode/:zipCode",(req:Request, res: Response)=>{
    LoggerService.info('GET /patients/zipcode/:zipcode')
    const zipCode = req.params.zipCode
    if(!isString(zipCode)){
        LoggerService.error('GET PATIENT ZIPCODE INVALIDE :' + JSON.stringify(req.params.zipCode))
        res.status(400).send("zipcode is not valid" )
        return;
    }
    const result : PatientDTO [] = []
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].address.zipCode === zipCode)
            result.push(PatientsMapper.toDTO(patients[i]))
    }
    res.status(200).json(result);
    
})






patientsController.get("/doctor/:id/zipCode/:zipCode",(req:Request, res:Response)=>{
    LoggerService.info('GET /doctor/:id/zipcode/:zipcode')
    const refDoctor = Number(req.params.id)
    const zipCode = req.params.zipCode

    if(!isNumber(refDoctor) || !isString(zipCode)){
        LoggerService.error('GET DOCTOR ID ZIPCODE INVALIDE :' + JSON.stringify(req.params))
        res.status(400).send("Donnée invalide")
        return;
    }
    const results: PatientDTO [] = []
    
    for (let i = 0; i < patients.length; i++) {
        if(patients[i].refDoctor === refDoctor && patients[i].address.zipCode === zipCode){
            results.push(PatientsMapper.toDTO(patients[i]))
    }
}
    return res.status(200).json(results)
    
        
    }
)

patientsController.post("/", (req: Request, res: Response) => {
  LoggerService.info("POST /patients");
  
  const newPatientDTO: NewPatientDTO = req.body;

  if (!isNewPatient(newPatientDTO)) {
    LoggerService.error('POST PATIENT INVALIDE :' + JSON.stringify(req.body))
    return res.status(400).send("Les informations fournies ne sont pas valides pour un nouveau patient.");
  }

  const newPatientData = PatientsMapper.fromNewDTO(newPatientDTO);

  const id = patients.length+1;
  const newPatient: Patient = {
    id: id,
    firstName: newPatientData.firstName,
    lastName: newPatientData.lastName,
    birthDate: newPatientData.birthDate,
    niss: newPatientData.niss,
    address: newPatientData.address,
    refDoctor: newPatientData.refDoctor
    
  };

  patients.push(newPatient);

  return res.status(201).json(PatientsMapper.toDTO(newPatient));
});