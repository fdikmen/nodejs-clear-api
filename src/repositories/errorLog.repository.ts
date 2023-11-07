import { Op } from "sequelize";
import ErrorLog from "../models/errorLog.model";

interface IErrorLogRepository {
  save(errorLog: ErrorLog): Promise<ErrorLog>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<ErrorLog[]>;
  retrieveById(errorLogId: number): Promise<ErrorLog | null>;
  update(errorLog: ErrorLog): Promise<number>;
  delete(errorLogId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class ErrorLogRepository implements IErrorLogRepository {
  async save(errorLog: ErrorLog): Promise<ErrorLog> {
    try {
      return await ErrorLog.create({
        timestamp: errorLog.timestamp,
        errorCode: errorLog.errorCode,
        errorMessage: errorLog.errorMessage,
        errorType: errorLog.errorType,
        clientInfo: errorLog.clientInfo,
        serverInfo: errorLog.serverInfo,
        additionalInfo: errorLog.additionalInfo,
      });
    } catch (err) {
      throw new Error("Failed to create ErrorLog!");
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<ErrorLog[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

      return await ErrorLog.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve ErrorLogs!");
    }
  }

  async retrieveById(errorLogId: number): Promise<ErrorLog | null> {
    try {
      return await ErrorLog.findByPk(errorLogId);
    } catch (error) {
      throw new Error("Failed to retrieve ErrorLogs!");
    }
  }

  async update(errorLog: ErrorLog): Promise<number> {
    const { id,timestamp,errorCode,errorMessage,errorType,clientInfo,serverInfo,additionalInfo} = errorLog;

    try {
      const affectedRows = await ErrorLog.update(
        { timestamp,errorCode,errorMessage,errorType,clientInfo,serverInfo,additionalInfo},
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update ErrorLog!");
    }
  }

  async delete(errorLogId: number): Promise<number> {
    try {
      const affectedRows = await ErrorLog.destroy({ where: { id: errorLogId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete ErrorLog!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return ErrorLog.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete ErrorLogs!");
    }
  }
}

export default new ErrorLogRepository();
