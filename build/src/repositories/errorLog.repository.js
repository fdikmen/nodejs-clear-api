"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const errorLog_model_1 = __importDefault(require("../models/errorLog.model"));
class ErrorLogRepository {
    save(errorLog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield errorLog_model_1.default.create({
                    timestamp: errorLog.timestamp,
                    errorCode: errorLog.errorCode,
                    errorMessage: errorLog.errorMessage,
                    errorType: errorLog.errorType,
                    clientInfo: errorLog.clientInfo,
                    serverInfo: errorLog.serverInfo,
                    additionalInfo: errorLog.additionalInfo,
                });
            }
            catch (err) {
                throw new Error("Failed to create ErrorLog!");
            }
        });
    }
    retrieveAll(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let condition = {};
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.published)
                    condition.published = true;
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.title)
                    condition.title = { [sequelize_1.Op.like]: `%${searchParams.title}%` };
                return yield errorLog_model_1.default.findAll({ where: condition });
            }
            catch (error) {
                throw new Error("Failed to retrieve ErrorLogs!");
            }
        });
    }
    retrieveById(errorLogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield errorLog_model_1.default.findByPk(errorLogId);
            }
            catch (error) {
                throw new Error("Failed to retrieve ErrorLogs!");
            }
        });
    }
    update(errorLog) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, timestamp, errorCode, errorMessage, errorType, clientInfo, serverInfo, additionalInfo } = errorLog;
            try {
                const affectedRows = yield errorLog_model_1.default.update({ timestamp, errorCode, errorMessage, errorType, clientInfo, serverInfo, additionalInfo }, { where: { id: id } });
                return affectedRows[0];
            }
            catch (error) {
                throw new Error("Failed to update ErrorLog!");
            }
        });
    }
    delete(errorLogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield errorLog_model_1.default.destroy({ where: { id: errorLogId } });
                return affectedRows;
            }
            catch (error) {
                throw new Error("Failed to delete ErrorLog!");
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return errorLog_model_1.default.destroy({
                    where: {},
                    truncate: false
                });
            }
            catch (error) {
                throw new Error("Failed to delete ErrorLogs!");
            }
        });
    }
}
exports.default = new ErrorLogRepository();
