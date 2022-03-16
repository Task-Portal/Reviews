import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Review } from "./Review";

@Entity({ name: "Categories" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;

  @Column("varchar", {
    name: "Name",
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Review, (review) => review.category)
  review: Review;
}
