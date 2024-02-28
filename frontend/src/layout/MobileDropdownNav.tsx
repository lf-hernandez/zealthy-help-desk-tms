import { FormControl, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useNavigation } from '../hooks/navigation';
import { Pages } from '../types';

export const MobileDropdownNav = () => {
    const { currentPage, setCurrentPage } = useNavigation();

    const navItems = [
        {
            key: Pages.ADMIN_PANEL,
            value: 'Admin Panel',
        },
        {
            key: Pages.SUBMIT_FORM,
            value: 'Submit Form',
        },
    ];

    return (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
                value={currentPage}
                onChange={(event) => setCurrentPage(event.target.value as Pages)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {navItems.map((item) => (
                    <MenuItem value={item.key}>item.value</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
