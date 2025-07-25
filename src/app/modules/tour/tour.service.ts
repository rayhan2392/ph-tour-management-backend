import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";


const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }


    const tour = await Tour.create(payload)

    return tour;
};


const updateTour = async (id: string, payload: Partial<ITour>) => {

    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }



    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
};


const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};







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
    createTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType
}