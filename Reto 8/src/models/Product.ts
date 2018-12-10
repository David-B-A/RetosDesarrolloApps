import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm/browser";
import Company from './Company';

@Entity()
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    description: string;

    // @ManyToOne(type => Company, company => company.products)
    // company: Company;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

}