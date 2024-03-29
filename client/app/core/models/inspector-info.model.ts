import { DbModel } from './db.model';

export const InspectorInfoId = `inspectorInfo`;

export const CreateInspectorInfo = (): InspectorInfo => {
    const res = {} as InspectorInfo;
    res._id = InspectorInfoId; //only one
    res.isActive = true;
    return res;
};

export interface  InspectorInfo extends DbModel {
    companyName: string;
    companyAddress: string;

    inspectorSign: string; //multi line
}
