import { Router } from "express";
import handler from 'express-async-handler';
import DocModel from '../models/document.model.js';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/httpStatus.js";


const router = Router();

router.post('/createDoc', handler(async (req, res) => {
    const { title,
        docType,
        authorName,
        authorEmail,
        date,
        sender,
        reciver,
        state,
        discription} = req.body;

    // Validate request body
    if (!title || !docType || !authorName || !authorEmail || !date || !sender || !reciver || !state || !discription) {
        return res.status(BAD_REQUEST).send("Missing required fields");
    }
    const newDoc= {
        docId: await generateDocId(),
        title,docType,authorEmail,authorName,authorEmail,
        date,
        sender,
        reciver,
        state,
        discription
    }
    try {
        const docCreated = await DocModel.create(newDoc);
        res.send(docCreated);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send("Doc create failed");
    }
}));

router.get('/getDocs', handler(async (req, res) => {
    

    try {
        // Fetch all plans with the same email
        const docs = await DocModel.find({});
        res.send(docs);
    } catch (error) {
        console.error("Error fetching docs:", error);
        res.status(INTERNAL_SERVER_ERROR).send("Doc fetch error");
    }
}));

//delete a plan
router.delete('/deleteDoc/:docId', handler(async (req, res) => {
    const { docId } = req.params;
    if (!docId) {
        return res.status(BAD_REQUEST).send("Missing required fields");
    }
    try {
        const result = await DocModel.deleteOne({docId:docId});
        res.send(result);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send("Plan delete failed");
    }
}));

//update a plan
router.put('/updateDoc', handler(async (req, res) => {
    const { 
        docId,
        title,
        docType,
        authorName,
        authorEmail,
        date,
        sender,
        reciver,
        state,
        discription } = req.body;
    if (!docId || !title || !docType || !authorName || !authorEmail || !date || !sender || !reciver || !state || !discription) {
        return res.status(BAD_REQUEST).send("Missing required fields");
    }
    try {
        await DocModel.updateOne({ docId:docId}, {title,docType,authorName,authorEmail,date,sender,reciver,state,discription });
        const updatedDoc = await DocModel.findOne({docId:docId});
        return res.send(updatedDoc);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send("Plan update failed");
    }
}));



const generateDocId = async () => {
    const count = await DocModel.countDocuments();
    const id = Math.floor(Math.random() * 1000000);
    const docId = `${id}_${count}`;
    return docId;
};

export default router;
