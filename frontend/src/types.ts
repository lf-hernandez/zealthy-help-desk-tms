export type Ticket = {
    customerEmail: string;
    customerName: string;
    dateCreated: string;
    description: string;
    id: string;
    lastModified: string;
    resolutionDescription: string;
    status: TicketStatus;
};

export enum TicketStatus {
    NEW = 'new',
    IN_PROGRESS = 'in progress',
    RESOLVED = 'resolved',
}

export enum Pages {
    'ADMIN_PANEL',
    'SUBMIT_FORM',
}

export type AddTicketInput = {
    customerEmail: string;
    customerName: string;
    description: string;
    status?: TicketStatus;
};

export type UpdateTicketInput = {
    resolutionDescription: string;
    status: TicketStatus;
};
