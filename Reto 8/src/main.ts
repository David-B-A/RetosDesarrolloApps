// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

import {createConnection} from "typeorm/browser";
var driver = require( "nativescript-sqlite" );
//import Product from './models/Product';
import Company from './models/Company';

(async () => {
    try {
        const connection = await createConnection({
            database: 'database.db',
            type: 'nativescript',
            driver,
            entities: [
                Company/* , Product */
            ],
            logging: true
        })

        console.log("Connection Created")

        // setting true will drop tables and recreate
        await connection.synchronize(false) 

        console.log("Synchronized")


    } catch (err) {
        console.error(err)
    }
})();

platformNativeScriptDynamic().bootstrapModule(AppModule);
