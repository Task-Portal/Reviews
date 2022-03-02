import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";

@Entity({ name: "Tags" })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;

  @Column("varchar", { name: "Title", length: 25, nullable: false })
  @Length(2, 15)
  title: string;

  // @ManyToOne(() => Review, review => review.tags)
  // review: Review;
}
