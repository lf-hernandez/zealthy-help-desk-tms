import { createContext, useState } from 'react';
import { Pages } from '../types';

type NavigationState = {
    currentPage: Pages;
    setCurrentPage: (page: Pages) => void;
};

export const NavigationContext = createContext<NavigationState>({
    currentPage: Pages.SUBMIT_FORM,
    setCurrentPage: () => {},
});

type Props = {
    children: React.ReactNode;
};

export const NavigationProvider = ({ children }: Props) => {
    const [currentPage, setCurrentPage] = useState(Pages.ADMIN_PANEL);

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
};
