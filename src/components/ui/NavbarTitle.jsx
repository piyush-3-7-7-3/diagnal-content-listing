import {Box, Typography } from '@mui/material';

const NavbarTitle = ({title}) => {
    return (<Box
        className="page-title"
        sx={{
            flexGrow: 6, // Allow the Box to grow
            flexShrink: 0, // Prevent shrinking
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Typography sx={{
            fontSize: {
                sm: '1.2rem',
                md: '1.5rem',
                lg: '1.4rem'
            },
            width: '100%'
        }}> {/* Adjust the variant as needed */}
            {title}
        </Typography>
    </Box>)
}

export default NavbarTitle;