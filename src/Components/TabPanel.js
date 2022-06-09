import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "../Components/Card";
import data from "../Components/Data.json";
// import InfiniteScroll from 'react-infinite-scroller';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [filteredData, setFilteredData] = useState(data.data);
  const [dataset, setData] = useState(false)

  useEffect(() => {
    const { searchText } = props;
    if (searchText) {
      setFilteredData(data.data.filter((item) => item.name.includes(searchText)));
    }
    else {
      setFilteredData(data.data);
    }
  }, [props.searchText]);


  useEffect(() => {
    switch (props.value) {
      case 0:
        setFilteredData(data.data.filter((item) => item.owner_id === 1));
        setData(true)
        break;
      case 1:
        setFilteredData(data.data);
        break;
      case 2:
        setFilteredData(data.data.filter((item) => item.status.includes("blocked")));
        break

      default:
    }
  }, [props.value])



  useEffect(() => {
    let details = data.data
    if (props.filterParams) {
      const { cardHolder, type } = props.filterParams;

      let types = []
      if (type.burner) {
        types.push("burner");
      }
      if (type.subscription) {
        types.push("subscription");
      }

      if (types.length) {
        details = details.filter((item) => types.includes(item.card_type));
      }

      if (cardHolder.length > 0) {
        details = details.filter((item) => item.owner_name.includes(cardHolder[0]));
      }


      setFilteredData(details);
    }

  }, [props.filterParams])


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container sx={{ padding: "1% 3.5%" }}>
          {filteredData.map((e, i) => {
            return (
              <>
                <Grid
                  xs={12}
                  md={6}
                  sx={{ padding: "0% 4%" }}
                >
                  <Cards asset={e} value={value} />
                </Grid>
              </>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default TabPanel;