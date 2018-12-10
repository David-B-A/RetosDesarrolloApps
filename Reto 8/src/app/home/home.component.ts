import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Company from '~/models/Company';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {Like} from "typeorm";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    @ViewChild("myForm") dataFormComp: RadDataFormComponent;
    public companies: Array<Company>;
    public company: Company;
    public mode:string;
    public searchPhrase: string;
    public companyMetadata= {
        "isReadOnly": false,
        "commitMode": "Immediate",
        "validationMode": "Immediate",
        "propertyAnnotations":
        [
            {
                "name": "name",
                "displayName": "Nombre",
                "index": 0,
                "editor": "Text",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "url",
                "displayName": "URL",
                "index": 1,
                "editor": "Text",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "phone",
                "displayName": "Teléfono",
                "index": 2,
                "editor": "Phone",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "PhoneValidator"}
                ]
            },
            {
                "name": "email",
                "displayName": "E-Mail",
                "index": 3,
                "editor": "Email",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "EmailValidator"}
                ]
            },
            {
                "name": "classification",
                "displayName": "Clasificación",
                "index": 4,
                "editor": "Picker",
                "valuesProvider": ["Consultoría", "Desarrollo a la medida", "Fábrica de software"],
                "validators": [
                    { "name": "NonEmpty" }
                ]
            },
            {
                "name": "id",
                "hidden":true
            }
        ]
    };
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.mode='retrive';
        this.company = new Company('test','','','','');
        this.refresh();
    }

    refresh() {
        Company.find().then((companies) => {           
            this.companies = companies;
        }).catch(console.error)
    }

    add() {
        this.company = new Company('','','','','');
        this.changeMode('create');
    }

    edit(company:Company){
        this.company= company;
        this.changeMode('update');
    }

    remove(company:Company){
        dialogs.confirm({
            title: "Confirmación de borrado",
            message: "Seguro desea borrar el registro de la empresa: "+company.name ,
            okButtonText: "Si",
            cancelButtonText: "No",
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result){
                company.remove().then((companies) => {
                    this.refresh();
                }).catch(console.error)
            }
        });
    }

    async onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        console.log("You are searching for " + searchBar.text);
        let companies= await Company.createQueryBuilder("company")
        .where("company.name like :name", { name: "%"+searchBar.text+"%" })
        .orWhere("company.classification like :classification", { classification: "%"+searchBar.text+"%" })
        .getMany();
        this.companies= companies;
        console.dir(companies);
    }

    onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);

        if(searchBar.text==''){
            this.refresh();
        }
    }

    changeMode(mode){
        this.mode= mode;
    }

    public async checkErrors() {
        const isValid = await this.dataFormComp.dataForm.validateAndCommitAll();
        console.log('Is Valid =>'+isValid);
        if(isValid){
            this.company.save().then(() =>{ 
                this.refresh();
                this.company = new Company('','','','','');
                this.mode= 'retrive';
            }).catch(console.error)
        }
    }
}
