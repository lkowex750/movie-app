import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import { useTranslation } from "react-i18next";
interface Props {
  setDateValue: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
}

const DateFilters = (props: Props) => {
  const { t } = useTranslation();
  const [startDateValue, setStartDateValue] = useState<Date | null>(null);
  const [endDateValue, setEndDateValue] = useState<Date | null>(null);

  useEffect(() => {
    if (startDateValue !== null && endDateValue !== null) {
      props.setDateValue([startDateValue, endDateValue]);
    }
  }, [startDateValue, endDateValue]);
  return (
    <Grid container direction="row">
      <Grid item marginRight={2} marginBottom={2}>
        <DatePicker
          label={t("date_from")}
          value={startDateValue}
          onChange={(newValue) => {
            setStartDateValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>

      <Grid item>
        <DatePicker
          label={t("date_to")}
          value={endDateValue}
          onChange={(newValue) => {
            setEndDateValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </Grid>
  );
};

export default DateFilters;
