import Tag from "./Tag";

export default class Review {
  constructor(
    public id: string,
    public body: string,
    public title: string,
    public authMark: number,
    public category: object,
    public tags: Array<Tag>
  ) {}
}
