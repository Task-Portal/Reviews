import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Review} from "./Review";
import {User} from "../user/User";

@Entity({ name: "Likes" })
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("boolean", { name: "Like", default: false, nullable: false })
    like: boolean;

    //Todo should Like contain user id


    @ManyToOne(() => Review, review => review.likes)
    review: Review;

    @ManyToOne(() => User, user => user.likes)
    user: User;


}