import { useTickets } from '../hooks/tickets';
import { Ticket } from '../types';
import { MobileTicketListItem } from './MobileTicketListItem';

type Props = {
    onPress: (ticket: Ticket) => void;
};
export const MobileTicketList = ({ onPress }: Props) => {
    const { tickets } = useTickets();

    if (!tickets || tickets.length === 0) {
        return <p>No tickets available</p>;
    }

    return (
        <div>
            {tickets.map((ticket) => (
                <MobileTicketListItem key={ticket.id} ticket={ticket} onPress={onPress} />
            ))}
        </div>
    );
};
