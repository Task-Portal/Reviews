import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {Length} from "class-validator";
import {ReviewCategory} from "./ReviewCategory";
import {Photo} from "./Photo";
import {Tag} from "./Tag";
import {Points} from "./Points";


@Entity()
export class Review  {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;

  // @Column("int", { name: "Points", default: 0, nullable: false })
  // points: number;
  // Todo user like
  //
  @Column("int", { name: "AuthorMark", default: 0, nullable: false })
  authorMark: number;

  @OneToOne(() => ReviewCategory, category=>category.review)
  @JoinColumn()
  category: ReviewCategory;

  @OneToMany(() => Photo, photo => photo.review)
  photos: Photo[];

  @OneToMany(() => Tag, tag => tag.review)
  tags: Tag[];
  @OneToMany(() => Points, point => point.review)
  points: Points[];











}
