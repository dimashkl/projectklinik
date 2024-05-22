import jadwaldokter from "../models/JadwalDokterModels.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

import path from "path";
import fs from "fs";

export const getJadwalDokter = async(req,res) =>{
    try {
        let response;
        response = await jadwaldokter.findAll({
            attributes: ['uuid', 'image', 'url', 'namaDokter', 'idDokter', 'noSIP', 'noSTR', 'poli', 'jadwalpraktikdokter', 'userId'],
            where:{
                userId: req.userId
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

export const getJadwalDokterById = async(req,res) =>{
    try {
        const schedule = await jadwaldokter.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!schedule) return res.status(404).json({msg:"Data tidak dapat ditemukan"})
        let response;
        response = await jadwaldokter.findOne({
            attributes: ['uuid', 'image', 'url', 'namaDokter', 'idDokter', 'noSIP', 'noSTR', 'poli', 'jadwalpraktikdokter', 'userId'],
            where:{
                [Op.and]:[{id: schedule.id},{userId: req.userId}]
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

export const jadwaldokterUser = async (req, res) =>{
    const user = await jadwaldokter.findAll({
    });
    if(!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    res.status(200).json(user);
}

export const jadwaldokteruserByUId = async (req, res) =>{
    const user = await jadwaldokter.findAll({
        where:{
            userId: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    res.status(200).json(user);
}

export const createJadwalDokter = (req,res) =>{
    if(req.files === null) return res.status(400).json({msg : "No File Uploaded"});
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    const namaDokter = req.body.namaDokter;
    const idDokter = req.body.idDokter;
    const noSIP = req.body.noSIP;
    const noSTR = req.body.noSTR;
    const poli = req.body.poli;
    const jadwalpraktikdokter = req.body.jadwalpraktikdokter;
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize> 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async (err) => {
        if(err) return res.status(500).json({msg: err.message});
   try {
       await jadwaldokter.create({
           image : fileName,
           url: url,
           namaDokter: namaDokter,
           idDokter: idDokter,
           noSIP: noSIP,
           noSTR: noSTR,
           poli: poli,
           jadwalpraktikdokter: jadwalpraktikdokter,
           userId: req.userId
       });
       res.status(201).json({msg: "Jadwal Dokter Created Successfuly"});
   } catch (error) {
       res.status(500).json({msg: error.message});
   }
})
}

export const updateJadwalDokter = async (req, res) => {
    const schedule = await jadwaldokter.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!schedule) return res.status(404).json({msg: "data tidak ditemukan!"});
    let fileName = "";
    if(req.files === null){
        fileName = schedule.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg', '.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize> 5000000) return res.status(422).json({msg: "Image must be lesst than 5 MB"});

        const filepath = `./public/images/${schedule.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
       });
    }
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const namaDokter = req.body.namaDokter;
    const idDokter = req.body.idDokter;
    const noSIP = req.body.noSIP;
    const noSTR = req.body.noSTR;
    const poli = req.body.poli;
    const jadwalpraktikdokter = req.body.jadwalpraktikdokter;
    try {
    if(req.userId !== schedule.userId) return res.status(403).json({msg:"Akses terlarang!"});
    await jadwaldokter.update({
        image : fileName,
        url: url,
        namaDokter: namaDokter,
        idDokter: idDokter,
        noSIP: noSIP,
        noSTR: noSTR,
        poli: poli,
        jadwalpraktikdokter: jadwalpraktikdokter,
        },{
        where:{
            [Op.and]:[{id: schedule.id}, {userId: req.userId}]
        }
    });
    res.status(200).json({msg: "Jadwal Dokter Updated Successfuly"});
} catch (error) {
    res.status(500).json({msg: error.msg});
}

}

export const deleteJadwalDokter = async (req, res) => {
    const schedule = await jadwaldokter.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!schedule) return res.status(404).json({msg: "data tidak ditemukan!"});
    if(req.userId !== schedule.userId) return res.status(403).json({msg:"Akses terlarang!"});
    try {
        const filepath = `./public/images/${schedule.image}`;
        fs.unlinkSync(filepath);
    await jadwaldokter.destroy({
        where:{
           // uuid: req.params.id
            [Op.and]:[{id: schedule.id}, {userId: req.userId}]
        }
    });
    res.status(200).json({msg: "Jadwal Dokter deleted Successfuly"});
} catch (error) {
    res.status(500).json({msg: error.msg});
}
}