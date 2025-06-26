import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    HasMany,
    Unique
} from 'sequelize-typescript'
import { Tarefa } from './Tarefa';

export interface CreateData {
    name: string;
    email: string;
    tarefaId: Array<number>;
}

@Table
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    name: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(40))
    email: string;

    @HasMany(() => Tarefa)
    tarefas: Tarefa[];

}