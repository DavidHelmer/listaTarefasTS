import {
    AllowNull,
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

@Table
export class Tarefa extends Model<Tarefa> {
    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column
    id!: number;
}

