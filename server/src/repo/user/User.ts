import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany,} from "typeorm";
import { Length } from "class-validator";

import { Auditable } from "../Auditable";
import {UserStatus} from "./UserStatus";
import {UserThemeMode} from "./UserThemeMode";
import {UserLanguage} from "./UserLanguage";
import {Review} from "../review/Review";
import {Like} from "../review/Like";



@Entity({ name: "Users" })
export class User extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Email",
    length: 120,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column("varchar", {
    name: "UserName",
    length: 60,
    nullable: false,
  })
  userName: string;

  @Column("varchar", { name: "Password", length: 100, nullable: false })
  @Length(1, 100)
  password: string;

  @OneToOne(() => UserStatus, status=>status.user)
  @JoinColumn()
  status: UserStatus;

  @OneToOne(() => UserThemeMode, mode =>mode.user)
  @JoinColumn()
  mode: UserThemeMode;

  @OneToOne(() => UserLanguage, lang =>lang.user)
  @JoinColumn()
  language: UserLanguage;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

}
