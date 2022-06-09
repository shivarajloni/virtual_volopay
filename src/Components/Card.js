import { Avatar, Button, Card, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Icon } from '@iconify/react';
import { common } from '@mui/material/colors';

const Cards = (props) => {
    return (
        <>
            {props.asset ?
                <Card sx={{ display: 'flex', alignItems: 'center', p: 3, flexGrow: 1, mt: 2, boxShadow: 5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            <Grid xs={8} md={8}>
                                <div className="card_heading">
                                    <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>{props.asset.name}</Typography>
                                    <Typography sx={{ color: "#B9BFC4" }}>{props.asset.owner_name}<span><Icon icon="bi:dot" /></span>{props.asset.budget_name}</Typography>
                                </div>
                            </Grid>
                            <Grid xs={4} md={4}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-end' }}>
                                    {
                                        props.asset.card_type === "burner" ?
                                            <Avatar sx={{ bgcolor: common.white, boxShadow: 3 }}>
                                                <Icon icon="ps:feedburner" style={{ fontSize: '35px', color: "#ff3266" }} />
                                            </Avatar>
                                            :
                                            <Avatar sx={{ bgcolor: common.white, boxShadow: 3 }}>
                                                <Icon icon="bi:arrow-repeat" style={{ fontSize: '35px', color: "#ff3266" }} />
                                            </Avatar>

                                    }
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mt: 1 }}>
                            <Grid xs={8} md={8}>
                                <div>
                                    <Button variant="outlined" size='small' disabled>{props.asset.card_type}</Button>
                                </div>
                            </Grid>
                            <Grid xs={4} md={4}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-end' }}>
                                    <Typography sx={{ color: "#B9BFC4" }}>Expires:<span>{props.asset.expiry}</span></Typography>
                                </div>
                            </Grid>
                        </Grid>


                        <Grid container sx={{ mt: 1 }}>
                            <Grid xs={8} md={8}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Icon icon="ci:dot-04-l" color="#ff3266" />
                                    <Typography sx={{ ml: 0.2 }}>Spent</Typography>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Icon icon="ci:dot-04-l" color="#219456" />
                                    <Typography sx={{ ml: 0.2 }}>Available to spend</Typography>
                                </div>
                            </Grid>
                            <Grid xs={4} md={4}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-end' }}>
                                    <Typography>{props.asset.spent.value}{' '}{props.asset.spent.currency}</Typography>
                                    <Typography>{props.asset.available_to_spend.value}{' '}{props.asset.available_to_spend.currency}</Typography>
                                </div>
                            </Grid>
                        </Grid>

                    </Box>
                </Card>
                :
                "Loading"
            }
        </>
    )
}

export default Cards;