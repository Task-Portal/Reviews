import {Entity, PrimaryGeneratedColumn, Column,  JoinColumn, OneToMany, ManyToOne} from "typeorm";
import {Length} from "class-validator";
import {Category} from "./Category";
import {Photo} from "./Photo";
import {Tag} from "./Tag";
import {Points} from "./Points";
import {Like} from "./Like";
import {User} from "../user/User";


@Entity({ name: "Review" })
export class Review  {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "Body", length: 5000, nullable: true })
  @Length(10, 2500)
  body: string;


  @Column("int", { name: "AuthorMark", default: 0, nullable: false })
  authorMark: number;

  @ManyToOne(() => Category, category=>category.review)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Photo, photo => photo.review)
  photos: Photo[];

  @OneToMany(() => Tag, tag => tag.review)
  tags: Tag[];
  @OneToMany(() => Points, point => point.review)
  points: Points[];
  @OneToMany(() => Like, like => like.review)
  likes: Like[];

  @ManyToOne(() => User, user => user.reviews)
  user: User;











}
