import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Review} from "./Review";

@Entity({ name: "Photos" })
export class Photo {

    @PrimaryGeneratedColumn({ name: "Id", type: "int" })
    id: number;

    @Column("varchar", { name: "Url", length: 1000, nullable: false })
    url: string;

    @ManyToOne(() => Review, review => review.photos,)
    review: Review;

}