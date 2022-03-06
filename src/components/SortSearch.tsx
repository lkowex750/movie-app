import React, { useState } from "react";
import { Select, MenuItem, InputLabel } from "@mui/material";
type Props = {
  typeMovie: string;
  setSortAction: React.Dispatch<React.SetStateAction<string>>;
  setOnClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortSearch = (props: Props) => {
  const dataArray = [
    { name: "Popularity Ascending ", value: "popularity.asc" },
    { name: "Popularity Descending", value: "popularity.desc" },
    { name: "Release date Ascending ", value: "release_date.asc" },
    { name: "Release date Descending", value: "release_date.desc" },
    { name: "Revenue Ascending ", value: "revenue.asc" },
    { name: "Revenue Descending", value: "revenue.desc" },
    {
      name: "Primary Release date Ascending ",
      value: "primary_release_date.asc",
    },
    {
      name: "Primary Release date Descending",
      value: "primary_release_date.desc",
    },
    { name: "Original Title Ascending ", value: "original_title.asc" },
    { name: "Original Title Descending", value: "original_title.desc" },
    { name: "Vote Average Ascending ", value: "vote_average.asc" },
    { name: "Vote Average Descending", value: "vote_average.desc" },
    { name: "Vote Count Ascending ", value: "vote_count.asc" },
    { name: "Vote Count Descending", value: "vote_count.desc" },
  ];

  const dataSortTv = [
    { name: "Popularity Ascending ", value: "popularity.asc" },
    { name: "Popularity Descending", value: "popularity.desc" },
    { name: "Vote Average Ascending ", value: "vote_average.asc" },
    { name: "Vote Average Descending", value: "vote_average.desc" },
    { name: "Release date Ascending ", value: "first_air_date.asc" },
    { name: "Release date Descending", value: "first_air_date.desc" },
  ];

  const [sortValue, setSortAction] = useState<string>("");
  //setSortValue("123");
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={sortValue}
      label={"Sort Results By"}
      fullWidth
      displayEmpty
    >
      {props.typeMovie === "movie"
        ? dataArray.map((data, index) => {
            return (
              <MenuItem
                key={index}
                value={data.value}
                onClick={() => {
                  setSortAction(data.value);
                  props.setSortAction(data.value);
                  props.setOnClicked(true);
                }}
              >
                {data.name}
              </MenuItem>
            );
          })
        : dataSortTv.map((data, index) => {
            return (
              <MenuItem
                key={index}
                value={data.value}
                onClick={() => {
                  setSortAction(data.value);
                  props.setSortAction(data.value);
                  props.setOnClicked(true);
                }}
              >
                {data.name}
              </MenuItem>
            );
          })}
    </Select>
  );
};

export default SortSearch;
