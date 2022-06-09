import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import './Header.css';

const Header = () => {
    return (
        <div>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid xs={12} md={10} sx={{ padding: "1% 5%" }}>
                    <div className='parent_heading_container'>
                        <Typography sx={{ fontSize: "2.4rem", fontWeight: "bold" }}>Virtual cards</Typography>
                        <div className='icon_container'>
                            <Icon icon="bx:video" color="#94bef2" />
                            <span>Learn more</span>
                        </div>
                    </div>
                </Grid>
                <Grid xs={12} md={2}>
                    <div className='btn_container'>
                        <Button variant="outlined" sx={{ boxShadow: 2 }} startIcon={<Icon icon="ant-design:plus-outlined" />}>
                            <span>Virtual Card</span>
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header