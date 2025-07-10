import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    BelongsTo
} from 'sequelize-typescript'

import { User } from './User';

export interface CreateData {
    name: string;
    description: string;
    urgent: boolean;
}

@Table
export class Task extends Model<Task> implements CreateData {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    usuarioId: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    description: string;

    @AllowNull
    @Column(DataType.BOOLEAN)
    urgent: boolean;

    @BelongsTo(() => User)
    usuario: User;


}
