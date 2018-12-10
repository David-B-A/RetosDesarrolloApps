import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm/browser";
import Product from './Product';

@Entity()
export default class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    classification: string;

    // @OneToMany(type => Product, products => products.company) // note: we will create company property in the Product class below
    // products: Product[];

    constructor(name: string, url: string, phone: string, email: string, classification: string) {
        super();
        this.name = name;
        this.url = url;
        this.phone = phone;
        this.email = email;
        this.classification= classification;
    }

}