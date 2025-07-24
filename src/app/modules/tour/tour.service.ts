import { ITourType } from "./tour.interface";
import { TourType } from "./tour.model";

const createTourType = async (payload: ITourType) => {

    const existingTourType = await TourType.findOne({ name: payload.name });

    if (existingTourType) {
        throw new Error('Tour type already exist')
    }
    const tourType = await TourType.create(payload);

    return tourType
}

const getAllTourTypes = async () => {
    return await TourType.find();
};


const updateTourType = async (id: string, payload: ITourType) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};


const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }
    await TourType.findByIdAndDelete(id)
    return null
};

export const tourServices = {
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType
}