import {Review} from "./Review";
import {QueryArrayResult} from "../QueryArrayResult";

export class ReviewResult {
    constructor(public messages?: Array<string>, public review?: [Review]) {
    }
}






export const getAllReviews = async (): Promise<QueryArrayResult<Review>> => {

    const reviews = await Review.find();

    return {
        entities: reviews,
    };
};



