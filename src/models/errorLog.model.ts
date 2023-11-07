import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "errorLog",
})
export default class ErrorLog extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.DATE,
    field: "timestamp"
  })
  timestamp?: Date;

  @Column({
    type: DataType.INTEGER,
    field: "errorCode"
  })
  errorCode?: number;

  @Column({
    type: DataType.STRING(255),
    field: "errorMessage"
  })
  errorMessage?: string;

  @Column({
    type: DataType.STRING(255),
    field: "errorType"
  })
  errorType?: string;

  @Column({
    type: DataType.STRING(255),
    field: "clientInfo"
  })
  clientInfo?: string;

  @Column({
    type: DataType.STRING(255),
    field: "serverInfo"
  })
  serverInfo?: string;

  @Column({
    type: DataType.STRING(255),
    field: "additionalInfo"
  })
  additionalInfo?: string;
}
