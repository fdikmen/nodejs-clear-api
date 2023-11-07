import { Request, Response } from "express";
import ErrorLog from "../models/errorLog.model";
import errorLogRepository from "../repositories/errorLog.repository";

export default class ErrorLogController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const errorLog: ErrorLog = req.body;
      // if (!errorLog.published) errorLog.published = false;

      const savedErrorLog = await errorLogRepository.save(errorLog);

      res.status(201).send(savedErrorLog);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving errorLogs."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const errorLogs = await errorLogRepository.retrieveAll({ title });

      res.status(200).send(errorLogs);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving errorLogs."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const errorLog = await errorLogRepository.retrieveById(id);

      if (errorLog) res.status(200).send(errorLog);
      else
        res.status(404).send({
          message: `Cannot find ErrorLog with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving ErrorLog with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let errorLog: ErrorLog = req.body;
    errorLog.id = parseInt(req.params.id);

    try {
      const num = await errorLogRepository.update(errorLog);

      if (num == 1) {
        res.send({
          message: "ErrorLog was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ErrorLog with id=${errorLog.id}. Maybe ErrorLog was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating ErrorLog with id=${errorLog.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await errorLogRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "ErrorLog was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ErrorLog with id=${id}. Maybe ErrorLog was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete ErrorLog with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await errorLogRepository.deleteAll();

      res.send({ message: `${num} ErrorLogs were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all errorLogs."
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const errorLogs = await errorLogRepository.retrieveAll({ published: true });

      res.status(200).send(errorLogs);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving errorLogs."
      });
    }
  }
}
