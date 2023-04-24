"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const broker_bootstrap_1 = __importDefault(require("./bootstrap/broker.bootstrap"));
const database_bootstrap_1 = __importDefault(require("./bootstrap/database.bootstrap"));
const server_bootstrap_1 = __importDefault(require("./bootstrap/server.bootstrap"));
const Logger_1 = __importDefault(require("./helpers/Logger"));
const broker_application_1 = require("./module/application/broker.application");
const broker_infrastructure_1 = require("./module/infrastructure/broker.infrastructure");
const broker_controller_1 = __importDefault(require("./module/interfaces/broker/broker.controller"));
const server = new server_bootstrap_1.default(app_1.default);
const database = new database_bootstrap_1.default();
const broker = new broker_bootstrap_1.default();
const brokerRepository = new broker_infrastructure_1.BrokerInfrastructure();
const brokerApplication = new broker_application_1.BrokerApplication(brokerRepository);
const brokerController = new broker_controller_1.default(brokerApplication);
(async () => {
    try {
        const promiseBootstraps = [
            server.initialize(),
            database.initialize(),
            broker.initialize(),
        ];
        await Promise.all(promiseBootstraps);
        brokerController.listen();
        setTimeout(() => {
            const record = { patientName: "Rosa Muga" };
            brokerController.sent(record);
        }, 2000);
    }
    catch (error) {
        Logger_1.default.error(error);
        process.exit(1);
    }
})();
