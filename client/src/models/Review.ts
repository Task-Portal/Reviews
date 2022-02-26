
export default class Review {
    constructor(
        public id: string,
        public body:string,
        public title:string,
        public authMark:number,
        public category:object,//Todo check if it is right add later points, photos ...
    ) {}
}