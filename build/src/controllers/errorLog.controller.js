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
const errorLog_repository_1 = __importDefault(require("../repositories/errorLog.repository"));
class ErrorLogController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.title) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const errorLog = req.body;
                // if (!errorLog.published) errorLog.published = false;
                const savedErrorLog = yield errorLog_repository_1.default.save(errorLog);
                res.status(201).send(savedErrorLog);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving errorLogs."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = typeof req.query.title === "string" ? req.query.title : "";
            try {
                const errorLogs = yield errorLog_repository_1.default.retrieveAll({ title });
                res.status(200).send(errorLogs);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving errorLogs."
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const errorLog = yield errorLog_repository_1.default.retrieveById(id);
                if (errorLog)
                    res.status(200).send(errorLog);
                else
                    res.status(404).send({
                        message: `Cannot find ErrorLog with id=${id}.`
                    });
            }
            catch (err) {
                res.status(500).send({
                    message: `Error retrieving ErrorLog with id=${id}.`
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorLog = req.body;
            errorLog.id = parseInt(req.params.id);
            try {
                const num = yield errorLog_repository_1.default.update(errorLog);
                if (num == 1) {
                    res.send({
                        message: "ErrorLog was updated successfully."
                    });
                }
                else {
                    res.send({
                        message: `Cannot update ErrorLog with id=${errorLog.id}. Maybe ErrorLog was not found or req.body is empty!`
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Error updating ErrorLog with id=${errorLog.id}.`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const num = yield errorLog_repository_1.default.delete(id);
                if (num == 1) {
                    res.send({
                        message: "ErrorLog was deleted successfully!"
                    });
                }
                else {
                    res.send({
                        message: `Cannot delete ErrorLog with id=${id}. Maybe ErrorLog was not found!`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Could not delete ErrorLog with id==${id}.`
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const num = yield errorLog_repository_1.default.deleteAll();
                res.send({ message: `${num} ErrorLogs were deleted successfully!` });
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while removing all errorLogs."
                });
            }
        });
    }
    findAllPublished(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errorLogs = yield errorLog_repository_1.default.retrieveAll({ published: true });
                res.status(200).send(errorLogs);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving errorLogs."
                });
            }
        });
    }
}
exports.default = ErrorLogController;
