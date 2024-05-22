import Fasilitas from "../models/FasilitasModel.js";
import User from "../models/UserModel.js"
import { Op } from "sequelize";

export const getFasilitas = async (req, res) => {   
    try {
        let response;
        response = await Fasilitas.findAll({
            attributes: ['uuid', 'namafasilitas', 'deskripsifasilitas'],
            where:{
                userId: req.userId
            }
        });
            res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});    
}
}

export const fasilUser = async (req, res) =>{
    const user = await Fasilitas.findAll({
    });
    if(!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    res.status(200).json(user);
}

export const fasiluserByUserId = async (req, res) =>{
    const user = await Fasilitas.findAll({
        where:{
            userId: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    res.status(200).json(user);
}


export const getFasilitasById = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!fasilitas) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        let response;
        response = await Fasilitas.findOne({
            attributes: ['uuid','namafasilitas', 'deskripsifasilitas'],
            where:{
                [Op.and]:[{id: fasilitas.id},{userId: req.userId}]
            },
            include:[{
                model: User,
                attributes:['firstname','lastname','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}




export const createFasilitas = async (req,res) =>{
    const {namafasilitas, deskripsifasilitas} = req.body;
    try {
        await Fasilitas.create({
            namafasilitas : namafasilitas,
            deskripsifasilitas : deskripsifasilitas,
            userId: req.userId
        });
        res.status(201).json({msg: "Fasilitas Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const updateFasilitas = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!fasilitas) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        const {namafasilitas, deskripsifasilitas } = req.body;
        if(req.userId !== fasilitas.userId) return res.status(403).json({msg:"akses terlarang"});
        await Fasilitas.update({namafasilitas, deskripsifasilitas},{
            where:{
                [Op.and]:[{id: fasilitas.id},{userId: req.userId}]
            }
        });
        res.status(200).json({msg:"Fasilitas updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}
    

export const deleteFasilitas = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!fasilitas) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        if(req.userId !== fasilitas.userId) return res.status(403).json({msg:"akses terlarang"});
        await Fasilitas.destroy({
            where:{
                [Op.and]:[{id: fasilitas.id},{userId: req.userId}]
            },
        });
        res.status(200).json({msg:"Daftar Fasilitas deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}

