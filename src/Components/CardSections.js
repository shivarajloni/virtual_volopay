import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Divider, Grid, TextField } from "@mui/material";
import "./CardSection.css";
import { Icon } from "@iconify/react";
import TabPanel from "./TabPanel";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = ["Vishal", "Sourabh", "Vikas", "Vinay"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CardSections = () => {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchField, setSearchField] = useState(false);
  const theme = useTheme();
  const [personName] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filterParams, setFilterParams] = React.useState({
    type: {
      subscription: false,
      burner: false
    },
    cardHolder: []
  })

  const [filterResult, setFilterResult] = React.useState(null)



  const handleCheckBox = (event, type) => {
    setFilterParams((state) => ({
      ...state,
      type: {
        ...state.type,
        [type]: event.target.checked
      }
    }));
  }


  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterParams((state) => ({
      ...state,
      cardHolder: (typeof value === "string" ? value.split(",") : value)
    }))
  };

  const handleFilterChange = () => {
    setFilterResult(filterParams)
  }


  const handleClearFilter = () => {
    const value = {
      type: {
        subscription: false,
        burner: false
      },
      cardHolder: []
    }
    setFilterParams(value)
    setFilterResult(value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleToggle = () => {
    setSearchField(!searchField);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid xs={10} md={10}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ padding: "0 4%" }}
                aria-label="basic tabs example"
              >
                <Tab label="Your" {...a11yProps(0)} />
                <Tab label="All" {...a11yProps(1)} />
                <Tab label="Blocked" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Grid>
          <Grid xs={2} md={2}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Icon
                icon="ep:menu"
                style={{ fontSize: "20px" }}
              />
            </div>
          </Grid>
        </Grid>
        <Divider sx={{ width: "92%", marginLeft: "3.6rem" }} />

        <Grid container sx={{ padding: "0% 5%" }}>
          <Grid
            xs={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              alignItems: "center",
            }}
          >
            <div className="search_container">
              {!searchField ? (
                <Icon
                  icon="bx:search"
                  color="black"
                  id="search_icon"
                  onClick={handleToggle}
                />
              ) : (
                <TextField
                  id="outlined-search"
                  label="Search field"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  sx={{ pr: 2 }}
                />
              )}
              <Button
                aria-describedby={id}
                variant="outlined"
                startIcon={<Icon icon="bx:filter" />}
                onClick={handleClick}
              >
                Filter
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              sx={{ width: "100vw" }}
              >
                <Box sx={{ flexGrow: 1, padding: "3%" }}>
                  <div className="form_container">
                    <div className="heading">
                      <Typography sx={{ pt: 2 }}>Filter</Typography>
                    </div>
                    <Divider />
                    <Typography sx={{ padding:"20px 5px" }}>Type</Typography>
                    <div className="checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: pink[800],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                            checked={filterParams.type.subscription} onChange={(e) => handleCheckBox(e, "subscription")}
                          />
                        }
                        label="Subscription"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: pink[800],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                            checked={filterParams.type.burner} onChange={(e) => handleCheckBox(e, "burner")}
                          />
                        }
                        label="Burner"
                      />
                    </div>
                    <Typography sx={{ padding:"20px 5px" }}>Cardholder</Typography>

                    <div>
                      <FormControl sx={{ width: 219 }}>
                        <InputLabel id="demo-multiple-name-label">
                          Select cardholder
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={filterParams.cardHolder}
                          onChange={(e) => handleSelectChange(e)}
                          input={<OutlinedInput label="Select cardholder" />}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="button_section">
                      <Button variant="contained" sx={{ bgcolor: "#ff3266" }} onClick={handleFilterChange}>
                        Apply
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#ffff", color: "black" }}
                        onClick={handleClearFilter}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </Box>
              </Popover>
            </div>
          </Grid>
        </Grid>

        <TabPanel searchText={search} value={value} index={value} filterParams={filterResult} />
      </Box>
    </>
  );
};

export default CardSections;