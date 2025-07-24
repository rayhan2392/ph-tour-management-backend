import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {

    const isDivisionExist = await Division.findOne({ name: payload.name })
    
    if (isDivisionExist) {
        throw new Error('A division already exist with this name')
    }

    const division = await Division.create(payload)

    return division

}




export const divisionServices = {
    createDivision
}