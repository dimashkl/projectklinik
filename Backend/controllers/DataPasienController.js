import DataPasien from '../models/DataPasienModel.js';
import { Op } from "sequelize";

export const getdataPasien = async(req,res) =>{
    try {
            let response;
            response = await DataPasien.findAll({
            });
                res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});    
    }
}

export const createdataPasien = async(req,res) =>{
    const {fasilitas, data, namaDokter, tanggalDatang, jamDatang, userId} = req.body;
    try {
        await DataPasien.create({
            fasilitas: fasilitas,
            data: data,
            namaDokter: namaDokter,
            tanggalDatang: tanggalDatang,
            jamDatang: jamDatang,
            userId: userId

        });
        res.status(201).json({msg: "Form Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getdataPasienId = async(req,res) =>{
    try {
        const pasiendata = await DataPasien.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pasiendata) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        let response;
        response = await DataPasien.findOne({
            where:{
                [Op.and]:[{id: pasiendata.id}]
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}

export const updatedataPasien = async(req,res) =>{
    try {
        const pasiendata = await DataPasien.findOne({
        });
        if(!pasiendata) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        const {data} = req.body;
        if(req.userId !== dynamic.userId) return res.status(403).json({msg:"akses terlarang"});
        await DataPasien.update({data},{
            where:{
                [Op.and]:[{id: pasiendata.id}]
            },
        });
        res.status(200).json({msg:"Form updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}

export const deletedataPasien = async(req,res) =>{
    try {
        const pasiendata = await DataPasien.findOne({
        });
        if(!pasiendata) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        await DataPasien.destroy({
            where:{
                [Op.and]:[{id: pasiendata.id}]
            },
        });
        res.status(200).json({msg:"Form deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}