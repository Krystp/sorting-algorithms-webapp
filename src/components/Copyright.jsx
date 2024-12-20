import React from "react";
import { Link, Typography } from '@mui/material';

export default function Copyright() {
    return (
        <Typography variant="body2" color="primary" align="center">
            { 'Copyright © '}
            <Link color="inherit" href="https://issi.uz.zgora.pl/" style={{ color: '#16365C'}}>ISSI</Link>{' '}
            {new Date().getFullYear()}{'.'}
        </Typography>
    )
}