"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorial_controller_1 = __importDefault(require("../controllers/tutorial.controller"));
class TutorialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new tutorial_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        // Create a new Tutorial
        this.router.post("/", this.controller.create);
        // Retrieve all Tutorials
        this.router.get("/", this.controller.findAll);
        // Retrieve all published Tutorials
        this.router.get("/published", this.controller.findAllPublished);
        // Retrieve a single Tutorial with id
        this.router.get("/:id", this.controller.findOne);
        // Update a Tutorial with id
        this.router.put("/:id", this.controller.update);
        // Delete a Tutorial with id
        this.router.delete("/:id", this.controller.delete);
        // Delete all Tutorials
        this.router.delete("/", this.controller.deleteAll);
    }
}
exports.default = new TutorialRoutes().router;
