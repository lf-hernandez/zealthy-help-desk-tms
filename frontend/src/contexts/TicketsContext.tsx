import { createContext, useState } from 'react';
import type { AddTicketInput, Ticket, UpdateTicketInput } from '../types.ts';
import { createTicket, initialTickets } from '../utils/tickets.ts';

type TicketsState = {
    tickets: Array<Ticket> | null;
    addTicket: ({ customerEmail, customerName, description }: AddTicketInput) => void;
    currentTicket: Ticket | null;
    setCurrentTicket: (ticket: Ticket) => void;
    updateCurrentTicket: ({ resolutionDescription, status }: UpdateTicketInput) => void;
};

export const TicketsContext = createContext<TicketsState>({
    tickets: null,
    addTicket: () => {},
    currentTicket: null,
    setCurrentTicket: () => {},
    updateCurrentTicket: () => {},
});

type Props = {
    children: React.ReactNode;
};

export const TicketsProvider = ({ children }: Props) => {
    const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
    const [tickets, setTickets] = useState<Array<Ticket>>(initialTickets());

    const addTicket = (input: AddTicketInput) => {
        const ticket = createTicket(input);
        setTickets((prevTickets) => [...prevTickets, ticket]);
    };

    const updateCurrentTicket = (input: UpdateTicketInput) => {
        if (!currentTicket) return;

        const updatedTicket = { ...currentTicket, ...input };

        setTickets((prevTickets) =>
            prevTickets.map((ticket) => (ticket.id === currentTicket.id ? updatedTicket : ticket))
        );

        setCurrentTicket(updatedTicket);
    };

    return (
        <TicketsContext.Provider
            value={{ currentTicket, setCurrentTicket, tickets, addTicket, updateCurrentTicket }}
        >
            {children}
        </TicketsContext.Provider>
    );
};
