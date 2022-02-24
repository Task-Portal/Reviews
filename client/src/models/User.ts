
enum Status {
  active,block
}

export default class User {
  constructor(
    public id: string,
    public email: string,
    public userName: string,
    public status:Status,
    public createdOn: Date,
    public lastModifiedOn: Date
  ) {}
}
