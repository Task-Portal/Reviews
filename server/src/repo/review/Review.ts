import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Category } from "./Category";
import { Photo } from "./Photo";
import { Tag } from "./Tag";
import { Points } from "./Points";
import { Like } from "./Like";
import { User } from "../user/User";
import { Auditable } from "../Auditable";

@Entity({ name: "Review" })
export class Review extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Index()
  @Column("varchar", { name: "Title", length: 250, nullable: false })
  @Length(5, 150)
  title: string;

  @Index()
  @Column("varchar", { name: "Body", nullable: true })
  @Length(5, 5000)
  body: string;

  @Column("int", { name: "AuthorMark", default: 0, nullable: false })
  authorMark: number;

  @ManyToOne(() => Category, (category) => category.review)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Photo, (photo) => photo.review)
  photos: Photo[];

  // @OneToMany(() => Tag, tag => tag.review)
  // tags: Tag[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Points, (point) => point.review)
  points: Points[];
  @OneToMany(() => Like, (like) => like.review)
  likes: Like[];

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
