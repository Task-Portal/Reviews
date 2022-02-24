import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Review} from "./Review";

@Entity({ name: "Photos" })
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Review, review => review.photos)
    review: Review;

}