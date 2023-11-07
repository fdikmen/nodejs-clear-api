import { Router } from "express";
import ErrorLogController from "../controllers/errorLog.controller";

class ErrorLogRoutes {
  router = Router();
  controller = new ErrorLogController();

  constructor() {
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

export default new ErrorLogRoutes().router;
