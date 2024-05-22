import Dynamic from "../models/FormulirModel.js";
import argon2 from "argon2";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDynamics = async(req,res) =>{
    try {
        let response;
        response = await Dynamic.findAll({
            attributes: ['uuid', 'pertanyaan'],
            where:{
                userId: req.userId
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});    
    }
}

export const meUser = async (req, res) =>{
    const user = await Dynamic.findAll({
    });
    if(!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    res.status(200).json(user);
}

export const meUserId = async (req, res) =>{
    try {
        const user = await Dynamic.findOne({
            where:{
                userId: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        let response;
        response = await Dynamic.findOne({
            attributes: ['uuid', 'pertanyaan'],
            where:{
                [Op.and]:[{userId: req.params.id}]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}

export const getDynamicyId = async(req,res) =>{
    try {
        const dynamic = await Dynamic.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!dynamic) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        let response;
        response = await Dynamic.findOne({
            attributes: ['uuid', 'pertanyaan'],
            where:{
                [Op.and]:[{id: dynamic.id},{userId: req.userId}]
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

export const createDynamic = async(req,res) =>{
    const {pertanyaan} = req.body;
    try {
        await Dynamic.create({
            pertanyaan: pertanyaan,
            userId: req.userId
        });
        res.status(201).json({msg: "Form Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDynamic = async(req,res) =>{
    try {
        const dynamic = await Dynamic.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!dynamic) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        const {pertanyaan} = req.body;
        if(req.userId !== dynamic.userId) return res.status(403).json({msg:"akses terlarang"});
        await Dynamic.update({pertanyaan},{
            where:{
                [Op.and]:[{id: dynamic.id},{userId: req.userId}]
            },
        });
        res.status(200).json({msg:"Form updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}

export const deleteDynamic = async(req,res) =>{
    try {
        const dynamic = await Dynamic.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!dynamic) return res.status(404).json({msg:"Data Tidak Ditemukan"})
        if(req.userId !== dynamic.userId) return res.status(403).json({msg:"akses terlarang"});
        await Dynamic.destroy({
            where:{
                [Op.and]:[{id: dynamic.id},{userId: req.userId}]
            },
        });
        res.status(200).json({msg:"Form deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}