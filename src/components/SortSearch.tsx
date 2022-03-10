import React, { useContext, useEffect, useState } from "react";
import { Select, MenuItem, InputLabel } from "@mui/material";
import LanguageContext from "../context/LanguageContext";
import { Filter } from "../interface/FilterInterface";
type Props = {
  typeMovie: string;
  setSortAction: React.Dispatch<React.SetStateAction<string>>;
  setOnClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortSearch = (props: Props) => {
  const { isLanguageIn } = useContext(LanguageContext);
  const [dataArray, setDataArray] = useState<Array<Filter>>([]);
  const [dataArrayTv, setDataArrayTv] = useState<Array<Filter>>([]);
  const dataArrayEn = [
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

  const dataArrayTH = [
    { name: "ความนิยมจากน้อยไปมาก ", value: "popularity.asc" },
    { name: "ความนิยมจากมากไปน้อย", value: "popularity.desc" },
    { name: "วันที่เข้าฉายจากน้อยไปมาก ", value: "release_date.asc" },
    { name: "วันที่เข้าฉายจากมากไปน้อย", value: "release_date.desc" },
    { name: "รายได้จากน้อยไปมาก", value: "revenue.asc" },
    { name: "รายรับจากมากไปน้อย", value: "revenue.desc" },
    {
      name: "วันที่เผยแพร่หลักจากน้อยไปมาก ",
      value: "primary_release_date.asc",
    },
    {
      name: "วันที่เผยแพร่หลักจากมากไปน้อย",
      value: "primary_release_date.desc",
    },
    { name: "ชื่อเรื่องจากน้อยไปมาก ", value: "original_title.asc" },
    { name: "ชื่อเรื่องจากมากไปน้อย", value: "original_title.desc" },
    { name: "โหวตเฉลี่ยจากน้อยไปมาก ", value: "vote_average.asc" },
    { name: "โหวตเฉลี่ยจากมากไปน้อย", value: "vote_average.desc" },
    { name: "จำนวนโหวตจากน้อยไปมาก ", value: "vote_count.asc" },
    { name: "จำนวนโหวตจากมากไปน้อย", value: "vote_count.desc" },
  ];

  const dataSortTv = [
    { name: "Popularity Ascending ", value: "popularity.asc" },
    { name: "Popularity Descending", value: "popularity.desc" },
    { name: "Vote Average Ascending ", value: "vote_average.asc" },
    { name: "Vote Average Descending", value: "vote_average.desc" },
    { name: "Release date Ascending ", value: "first_air_date.asc" },
    { name: "Release date Descending", value: "first_air_date.desc" },
  ];

  const dataSortTvTH = [
    { name: "ความนิยมจากน้อยไปมาก ", value: "popularity.asc" },
    { name: "ความนิยมจากมากไปน้อย ", value: "popularity.desc" },
    { name: "โหวตเฉลี่ยจากน้อยไปมาก", value: "vote_average.asc" },
    { name: "โหวตเฉลี่ยจากมากไปน้อย", value: "vote_average.desc" },
    { name: "วันที่เข้าฉายจากน้อยไปมาก", value: "first_air_date.asc" },
    { name: "วันที่เข้าฉายจากมากไปน้อย", value: "first_air_date.desc" },
  ];

  const [sortValue, setSortAction] = useState<string>("");
  useEffect(() => {
    if (isLanguageIn === "th") {
      setDataArray(dataArrayTH);
      setDataArrayTv(dataSortTvTH);
    } else {
      setDataArray(dataArrayEn);
      setDataArrayTv(dataSortTv);
    }
  }, [isLanguageIn]);

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
        : dataArrayTv.map((data, index) => {
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

      {/* {props.typeMovie === "movie" && props.isLang === "th"
        ? dataArrayTH.map((data, index) => {
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
          })
          } */}
    </Select>
  );
};

export default SortSearch;
