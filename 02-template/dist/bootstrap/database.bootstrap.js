"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const mongoose_1=__importDefault(require("mongoose")),Logger_1=__importDefault(require("../helpers/Logger")),Parameters_1=__importDefault(require("../helpers/Parameters")),bootstrap_1=require("./bootstrap");class DatabaseBootstrap extends bootstrap_1.Bootstrap{initialize(){return new Promise(((e,t)=>{const{username:a,password:r,database:o,host:s,port:u,authSource:_}=this.dbConfig(),n=`mongodb://${a}:${r}@${s}:${u}/${o}?authSource=${_}`;mongoose_1.default.connect(n,{maxPoolSize:10}).then((()=>{e(!0),Logger_1.default.info("Database is connected")})).catch((e=>{t(e),Logger_1.default.info("Database is not connected")}))}))}dbConfig(){return{username:Parameters_1.default.MONGO_USERNAME,password:Parameters_1.default.MONGO_PASSWORD,database:Parameters_1.default.MONGO_DATABASE,host:Parameters_1.default.MONGO_HOST,port:Parameters_1.default.MONGO_PORT,authSource:Parameters_1.default.MONGO_AUTH_SOURCE}}}exports.default=DatabaseBootstrap;