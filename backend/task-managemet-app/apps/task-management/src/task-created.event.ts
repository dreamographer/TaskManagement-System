export class taskCreatedEvent{
    constructor(
        public readonly title:string
    ){}
    toString(){
        return JSON.stringify({
            title:this.title
        })
    }
}