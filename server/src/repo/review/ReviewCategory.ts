import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import {Review} from "./Review";


@Entity({ name: "ReviewCategories" })
export class ReviewCategory  {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;

  @Column("varchar", {
    name: "Name",
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToOne(() => Review, review => review.category)
  review: Review;
}
