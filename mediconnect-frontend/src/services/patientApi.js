import axios from 'axios' ;
import { config } from '../utils/constants' ;
/*
Patient information like name, age etc.
Number of upcoming appointments for a patient
Number of medical records for a patients
Number of active prescription for a patients
Upcoming appointments for a patient with doctor and schedule details to show on UI
Recent Reports for a patient for diagnostic tests.

Number of Completed appointments 
Total number of doctors a patient has consulted
Total  doctors  information for booking appointments
Total doctors based on branch. 


Medical Records details per prescription maximum 2  | pagination (Important)
no. of Active Prescription
Last Visit date
Number of lab reports 



Emergency Contacts details



*/




export async function getUpcomingAppointments() {
 try{

    const url = `${config.server}/patient/upcomingAppointments`;
    const response = await axios.get(url,{
        headers: {
            token: localStorage.getItem('token'),
    }
    });
// axios.get 2nd argument is config object where we can pass headers and other info like params such as query params.
    return response.data;
 }catch(ex){
    console.error("Error while fetching upcoming appointments:", ex);
 }
    
}

export async function getMedicalRecords() {
    try{
        const url = `${config.server}/patient/medicalRecords`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });

        return response.data;
    }catch(ex){
        console.error("Error fetching medical records:", ex);
    }
}

export async function getActivePrescriptions() {
    try{
        const url = `${config.server}/patient/activePrescriptions`;    

        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });

        return response.data;
    }catch(ex){
        console.error("Error fetching active prescriptions:", ex);
    }
}

export async function getRecentReports() {
    try{
        const url = `${config.server}/patient/recentReports`;   
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){     
        console.error("Error fetching recent reports:", ex);
    }
}

export async function NumberOfCompletedAppointments() {
    try{
        const url = `${config.server}/patient/CompletedAppointments`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching number of completed appointments:", ex);
    }
}

export async function TotalNumberOfDoctorsConsulted() {
    try{
        const url = `${config.server}/patient/TotalDoctorsConsulted`; 
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching total number of doctors consulted:", ex);
    }
}

export async function getAllDoctors() {
    try{
        const url = `${config.server}/patient/allDoctors`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching all doctors:", ex);
    }
}

export async function getDoctorsByBranch(branch) {
    try{
        const url = `${config.server}/patient/doctorsByBranch?branch=${branch}`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching doctors by branch:", ex);
    }
}

export async function fetchEmergencyContacts() {
    try{
        const url = `${config.server}/patient/emergencyContacts`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),  
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching emergency contacts:", ex);
    }   
}

export async function fetchLastVisitDate() {
    try{
        const url = `${config.server}/patient/lastVisitDate`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching last visit date:", ex);
    }   

}

export async function fetchLabReportsCount() { 
    try{
        const url = `${config.server}/patient/labReportsCount`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }
    catch(ex){
        console.error("Error fetching lab reports count:", ex);
    }
}

export async function fetchMedicalRecords(){
    try{
        const url = `${config.server}/patient/medicalRecords`;
        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return response.data;
    }catch(ex){
        console.error("Error fetching medical records:", ex);
    }
    
}