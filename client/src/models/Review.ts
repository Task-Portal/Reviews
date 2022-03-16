import Tag from "./Tag";
import User from "./User";
import Category from "./Category";

export default class Review {
  constructor(
    public id: string,
    public body: string,
    public title: string,
    public authMark: number,
    // public category: object,
    public category: Category,
    public tags: Array<Tag>,
    // public userId: string
    public user: User
  ) {}
}
