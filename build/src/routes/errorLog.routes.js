"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorLog_controller_1 = __importDefault(require("../controllers/errorLog.controller"));
class ErrorLogRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new errorLog_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        // Create a new ErrorLog
        this.router.post("/", this.controller.create);
        // Retrieve all ErrorLogs
        this.router.get("/", this.controller.findAll);
        // Retrieve all published ErrorLogs
        this.router.get("/published", this.controller.findAllPublished);
        // Retrieve a single ErrorLog with id
        this.router.get("/:id", this.controller.findOne);
        // Update a ErrorLog with id
        this.router.put("/:id", this.controller.update);
        // Delete a ErrorLog with id
        this.router.delete("/:id", this.controller.delete);
        // Delete all ErrorLogs
        this.router.delete("/", this.controller.deleteAll);
    }
}
exports.default = new ErrorLogRoutes().router;
