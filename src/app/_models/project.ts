export class Project {
    id?: number;
    companyId: number;
    projectType: string;
    description: string;
    constructor(init?: Partial<Project>){
        Object.assign(this, init);
    }
}