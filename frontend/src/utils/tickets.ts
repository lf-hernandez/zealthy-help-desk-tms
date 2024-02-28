import { nanoid } from 'nanoid';

import { AddTicketInput, Ticket, TicketStatus } from '../types';

export const createTicket = (input: AddTicketInput): Ticket => {
    const generateId = () => nanoid(6);

    const currentDate = new Date().toISOString();

    return {
        id: generateId(),
        customerEmail: input.customerEmail,
        customerName: input.customerName,
        description: input.description,
        dateCreated: currentDate,
        lastModified: currentDate,
        resolutionDescription: '',
        status: input.status ?? TicketStatus.NEW,
    };
};

const generateRandomCustomerData = () => {
    const customerNames = ['Brie Smith', 'Kyle Smith', 'Shanti Smith', 'John Smith'];
    const customerEmails = [
        'brie@example.com',
        'kyle@example.com',
        'shanti@example.com',
        'john@example.com',
    ];
    const descriptions = [
        'Issue with account',
        'Payment problem',
        'Technical support',
        'Feature request, testing really really really long string. It should be truncated.',
    ];

    const statusValues = Object.values(TicketStatus);
    const randomStatusIndex = Math.floor(Math.random() * statusValues.length);

    const randomIndex = Math.floor(Math.random() * 4);
    return {
        customerName: customerNames[randomIndex],
        customerEmail: customerEmails[randomIndex],
        description: descriptions[randomIndex],
        status: statusValues[randomStatusIndex],
    };
};

export const initialTickets = () => {
    const generatedTickets = Array.from({ length: 4 }, () => {
        return createTicket(generateRandomCustomerData());
    });

    return generatedTickets;
};
