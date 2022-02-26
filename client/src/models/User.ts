


export default class User {
  constructor(
    public id: string,
    public email: string,
    public userName: string,
    public createdOn: Date,
    public lastModifiedOn: Date
  ) {}
}
