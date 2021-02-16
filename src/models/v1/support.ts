import { PropertyType } from "@tsed/common";

export enum TicketStatus {
    'PendingSupportResponse' = 1,
    'PendingCustomerResponse' = 2,
    'Closed' = 3,
    'StaffNeedMoreTimeBeforeResponse' = 4,
}

export class SupportTicket {
    ticketId: number;
    ticketStatus: TicketStatus;
    userId: number;
    createdAt: string;
    updatedAt: string;
    ticketTitle: string;
    ticketBody: string;
}

export class SupportTicketReply {
    replyId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    ticketBody: string;
}