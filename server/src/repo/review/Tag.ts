import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Review} from "./Review";
import {Length} from "class-validator";

@Entity({ name: "Tags" })
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "Title", length: 15, nullable: false })
    @Length(2, 15)
    title: string;

    @ManyToOne(() => Review, review => review.tags)
    review: Review;

}