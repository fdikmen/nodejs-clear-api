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
const tutorial_repository_1 = __importDefault(require("../repositories/tutorial.repository"));
class TutorialController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.title) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const tutorial = req.body;
                if (!tutorial.published)
                    tutorial.published = false;
                const savedTutorial = yield tutorial_repository_1.default.save(tutorial);
                res.status(201).send(savedTutorial);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving tutorials."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = typeof req.query.title === "string" ? req.query.title : "";
            try {
                const tutorials = yield tutorial_repository_1.default.retrieveAll({ title });
                res.status(200).send(tutorials);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving tutorials."
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const tutorial = yield tutorial_repository_1.default.retrieveById(id);
                if (tutorial)
                    res.status(200).send(tutorial);
                else
                    res.status(404).send({
                        message: `Cannot find Tutorial with id=${id}.`
                    });
            }
            catch (err) {
                res.status(500).send({
                    message: `Error retrieving Tutorial with id=${id}.`
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tutorial = req.body;
            tutorial.id = parseInt(req.params.id);
            try {
                const num = yield tutorial_repository_1.default.update(tutorial);
                if (num == 1) {
                    res.send({
                        message: "Tutorial was updated successfully."
                    });
                }
                else {
                    res.send({
                        message: `Cannot update Tutorial with id=${tutorial.id}. Maybe Tutorial was not found or req.body is empty!`
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Error updating Tutorial with id=${tutorial.id}.`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const num = yield tutorial_repository_1.default.delete(id);
                if (num == 1) {
                    res.send({
                        message: "Tutorial was deleted successfully!"
                    });
                }
                else {
                    res.send({
                        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Could not delete Tutorial with id==${id}.`
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const num = yield tutorial_repository_1.default.deleteAll();
                res.send({ message: `${num} Tutorials were deleted successfully!` });
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while removing all tutorials."
                });
            }
        });
    }
    findAllPublished(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutorials = yield tutorial_repository_1.default.retrieveAll({ published: true });
                res.status(200).send(tutorials);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving tutorials."
                });
            }
        });
    }
}
exports.default = TutorialController;
