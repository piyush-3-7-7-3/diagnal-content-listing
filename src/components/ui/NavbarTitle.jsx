import {Box, Typography } from '@mui/material';

const NavbarTitle = ({title}) => {
    return (<Box
        className="page-title"
        sx={{
            flexGrow: 1, // Allow the Box to grow
            flexShrink: 0, // Prevent shrinking
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Typography sx={{
            fontSize: {
                xs: '0.7rem',
                sm: '1rem',
                md: '1.2rem',
                lg: '1.4rem'
            },
            width: '100%'
        }}> {/* Adjust the variant as needed */}
            {title}
        </Typography>
    </Box>)
}

export default NavbarTitle;