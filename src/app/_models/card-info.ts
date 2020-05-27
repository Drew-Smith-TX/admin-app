export class CardInfo {
    id: number;
    title: string;
    path: string;
    color: string;
    total: number;
    constructor(init?: Partial<CardInfo>){
        Object.assign(this, init);
    }
}
