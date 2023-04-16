"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
class UtilsService {
    static validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    }
    static validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        return re.test(password);
    }
}
exports.UtilsService = UtilsService;
