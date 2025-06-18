import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

export interface CreateData {
    name: string;
    description: string;
    urgent: boolean
}

@Table
export class Tarefa extends Model<Tarefa> implements CreateData {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    name!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    description!: string;

    @AllowNull
    @Column(DataType.BOOLEAN)
    urgent!: boolean;


}

export default Tarefa;
