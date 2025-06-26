import { Op } from 'sequelize';

import { AppError } from '../../errors/AppError';
// import Ticket from '../../models/Ticket';
// import { FastConfigSchemas } from './schemas';
// import { UserLog } from '../../models/UserLog';
// import { Request } from 'express';
// import { format } from 'date-fns';

interface Data {
    whatsappIds: number[];
    status: string[];
    dateBefore: string;
    companyId: number;
}

export const FastConfigResolveTicketsService = async (data: Data, reqUser: Request['user']): Promise<number> => {
    await FastConfigSchemas.resolveTickets.validate(data);

    const { whatsappIds, status, dateBefore, companyId } = data;

    const result = await Ticket.update(
        {
            status: 'closed',
            closedAt: new Date(),
            phase: 'FINALIZADO',
            phaseId: null,
            unreadMessages: 0,
        },
        {
            where: {
                whatsappId: { [Op.in]: whatsappIds },
                status: { [Op.in]: status },
                updatedAt: { [Op.lt]: dateBefore },
                isGroup: false,
                companyId,
            },
        },
    );

    if (result[0] === 0) {
        throw new AppError('Nenhum ticket encontrado');
    }

    const mapStatus = status.map(status => {
        if (status === 'open') return 'Em atendimento';
        if (status === 'pending') return 'Em espera';
    });
    await UserLog.create({
        userName: reqUser.name,
        userId: reqUser.id,
        companyId: reqUser.companyId,
        actionType: 'RESOLVE_TICKETS_IN_BATCH',
        actionTitle: `Resolveu ${result[0]} tickets`,
        actionDetails: `Conexões: ${whatsappIds.join(', ')}, \nStatus: ${mapStatus.join(', ')}, \nData antes: ${format(dateBefore, 'dd/MM/yyyy')}`
    })


    return result[0];
};