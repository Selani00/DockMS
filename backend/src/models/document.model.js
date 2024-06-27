import {model, Schema} from 'mongoose';

export const DocumentSchema = new Schema({
    docId: { type: String, required: true, unique: true},
    title:{ type: String, required: true } ,
        docType:{ type: String, required: true },
        authorName: { type: String, required: true },
        authorEmail:{ type: String, required: true } ,
        date:{ type: String, required: true },
        sender:{ type: String, required: true } ,
        reciver:{ type: String, required: true } ,
        state: { type: String, required: true },
        discription: { type: String, required: true },
});

const DocModel = model('Document', DocumentSchema);
export default DocModel;