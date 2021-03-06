import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./Review";

@Entity({ name: "Points" })
export class Points {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;

  @Column("int", { name: "Points", default: 0, nullable: false })
  points: number;

  //Todo should Points contain user id

  @ManyToOne(() => Review, (review) => review.points)
  review: Review;
}
