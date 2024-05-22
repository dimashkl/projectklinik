import ProfileFaskes from "../models/ProfileFaskesModel.js";
import User from "../models/UserModel.js"
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getProfileFaskes = async (req, res) => {   
    try {
        let response;
        response = await ProfileFaskes.findAll({
            attributes:[
                'uuid', 
                'name',
                'image', 
                'url',
                'deskripsiklinik', 
                'jenisFaskes', 
                /*'hariOperasionalSatu', 
                'jamBukaSatu', 
                'jamTutupSatu', 
                'hariOperasionalDua', 
                'jamBukaDua',
                'jamTutupDua',*/
                'days',
                'address', 
                'kelurahan',
                'kecamatan',
                'kota',
                'provinsi',
                'phone', 
                'email'
          ],
            where:{
                userId: req.userId
            },
            include:[{
                //artinya menyertakan user dalam tabel profilefaskes
                model: User,
                attributes:['firstname','lastname','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }

}

export const profileFaskes = async (req, res) =>{
    const user = await ProfileFaskes.findAll({
    });
    if(!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    res.status(200).json(user);
}

export const getProfileFaskesByUserId = async (req, res) =>{
    try {
        const profilefaskes = await ProfileFaskes.findOne({
            where:{
                userId: req.params.id
            }
        });
        if(!profilefaskes) return res.status(404).json({msg: "data tidak ditemukan!"});
        let response;
        response = await ProfileFaskes.findOne({
            attributes:[
                'uuid', 
                'name', 
                'deskripsiklinik', 
                'image',
                'url',
                'jenisFaskes', 
                'days',
                'address', 
                'kelurahan',
                'kecamatan',
                'kota',
                'provinsi',
                'phone', 
                'email'
          ],
            where:{
                [Op.and]:[{userId: req.params.id}]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
}


export const getProfileFaskesById = async (req, res) => {
    try {
        const profilefaskes = await ProfileFaskes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!profilefaskes) return res.status(404).json({msg: "data tidak ditemukan!"});
        let response;
        response = await ProfileFaskes.findOne({
            attributes:[
                'uuid', 
                'name', 
                'deskripsiklinik', 
                'image',
                'url',
                'jenisFaskes', 
                /*'hariOperasionalSatu', 
                'jamBukaSatu', 
                'jamTutupSatu', 
                'hariOperasionalDua', 
                'jamBukaDua',
                'jamTutupDua',*/
                'days',
                'address', 
                'kelurahan',
                'kecamatan',
                'kota',
                'provinsi',
                'phone', 
                'email'
          ],
            where:{
                [Op.and]:[{id: profilefaskes.id}, {userId: req.userId}]
            },
            include:[{
                //artinya menyertakan user dalam tabel profilefaskes
                model: User,
                attributes:['firstname','lastname','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
}

export const createProfileFaskes = (req,res) =>{
    if(req.files === null) return res.status(400).json({msg : "No File Uploaded"});
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg', '.jpeg'];
    const name = req.body.name;
    const deskripsiklinik = req.body.deskripsiklinik;
    const jenisFaskes = req.body.jenisFaskes;
    /*const hariOperasionalSatu = req.body.hariOperasionalSatu;
    const jamBukaSatu = req.body.jamBukaSatu;
    const jamTutupSatu = req.body.jamTutupSatu;
    const hariOperasionalDua = req.body.hariOperasionalDua;
    const jamBukaDua = req.body.jamBukaDua;
    const jamTutupDua = req.body.jamTutupDua;*/
    const days = req.body.days;
    const address = req.body.address;
    const kelurahan = req.body.kelurahan;
    const kecamatan = req.body.kecamatan;
    const kota = req.body.kota;
    const provinsi = req.body.provinsi;
    const phone = req.body.phone;
    const email = req.body.email;
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize> 5000000) return res.status(422).json({msg: "Image must be lesst than 5 MB"});

    file.mv(`./public/images/${fileName}`, async (err) => {
         if(err) return res.status(500).json({msg: err.message});
    try {
        await ProfileFaskes.create({
            name : name,
            image : fileName,
            url: url,
            deskripsiklinik: deskripsiklinik,
            jenisFaskes: jenisFaskes,
            /*hariOperasionalSatu: hariOperasionalSatu,
            jamBukaSatu: jamBukaSatu,
            jamTutupSatu: jamTutupSatu,
            hariOperasionalDua: hariOperasionalDua,
            jamBukaDua: jamBukaDua,
            jamTutupDua: jamTutupDua,*/
            days : days,
            address: address,
            kelurahan : kelurahan,
            kecamatan : kecamatan,
            kota : kota,
            provinsi : provinsi,
            phone: phone,
            email: email,
            userId: req.userId
        });
        res.status(201).json({msg: "Profile Klinik Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})
}


export const updateProfileFaskes = async (req, res) => {
        const profilefaskes = await ProfileFaskes.findOne({
            where:{
                userId: req.userId
            }
        });
        if(!profilefaskes) return res.status(404).json({msg: "data tidak ditemukan!"});
        let fileName = "";
        if(req.files === null){
            fileName = profilefaskes.image;
        }else{
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png','.jpg', '.jpeg'];

            if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
            if(fileSize> 5000000) return res.status(422).json({msg: "Image must be lesst than 5 MB"});

            const filepath = `./public/images/${profilefaskes.image}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/${fileName}`, (err) => {
                if(err) return res.status(500).json({msg: err.message});
           });
        }
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const name =req.body.name;
        const deskripsiklinik = req.body.deskripsiklinik;
        const jenisFaskes = req.body.jenisFaskes;
        /*const hariOperasionalSatu = req.body.hariOperasionalSatu;
        const jamBukaSatu = req.body.jamBukaSatu;
        const jamTutupSatu = req.body.jamTutupSatu;
        const hariOperasionalDua = req.body.hariOperasionalDua;
        const jamBukaDua = req.body.jamBukaDua;
        const jamTutupDua = req.body.jamTutupDua;*/
        const days = req.body.days;
        const address = req.body.address;
        const kelurahan = req.body.kelurahan;
        const kecamatan = req.body.kecamatan;
        const kota = req.body.kota;
        const provinsi = req.body.provinsi;
        const phone = req.body.phone;
        const email = req.body.email;
        try {
        if(req.userId !== profilefaskes.userId) return res.status(403).json({msg:"Akses terlarang!"});
        await ProfileFaskes.update({
            name : name,
            image : fileName,
            url: url,
            deskripsiklinik: deskripsiklinik,
            jenisFaskes: jenisFaskes,
            /*hariOperasionalSatu: hariOperasionalSatu,
            jamBukaSatu: jamBukaSatu,
            jamTutupSatu: jamTutupSatu,
            hariOperasionalDua: hariOperasionalDua,
            jamBukaDua: jamBukaDua,
            jamTutupDua: jamTutupDua,*/
            days : days,
            address: address,
            kelurahan : kelurahan,
            kecamatan : kecamatan,
            kota : kota,
            provinsi : provinsi,
            phone: phone,
            email: email},{
            where:{
                [Op.and]:[{id: profilefaskes.id}, {userId: req.userId}]
            }
        });
        res.status(200).json({msg: "Profile Klinik Updated Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }

}
    

export const deleteProfileFaskes = async (req, res) => {
        const profilefaskes = await ProfileFaskes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!profilefaskes) return res.status(404).json({msg: "data tidak ditemukan!"});
        if(req.userId !== profilefaskes.userId) return res.status(403).json({msg:"Akses terlarang!"});
        try {
            const filepath = `./public/images/${profilefaskes.image}`;
            fs.unlinkSync(filepath);
        await ProfileFaskes.destroy({
            where:{
               // uuid: req.params.id
                [Op.and]:[{id: profilefaskes.id}, {userId: req.userId}]
            }
        });
        res.status(200).json({msg: "Profile Klinik deleted Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
}

