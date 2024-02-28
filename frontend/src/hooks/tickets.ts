import { useContext } from 'react';
import { TicketsContext } from '../contexts/TicketsContext';

export const useTickets = () => {
    return useContext(TicketsContext);
};
