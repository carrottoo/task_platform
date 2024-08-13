import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CalendarToday } from "@mui/icons-material";

const DateCard = () => {
  const now = new Date();
  // Separate options for weekday, and date with year
  const weekdayOptions = { weekday: "long" };
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  const weekday = now.toLocaleDateString("en-US", weekdayOptions); // e.g., "Friday"
  const dateYear = now.toLocaleDateString("en-US", dateOptions); // e.g., "May 9, 2024"

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 2,
        boxShadow: 0,
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <CardContent>
        <CalendarToday sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {weekday}
        </Typography>
        <Typography variant="h5" component="div">
          {dateYear}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DateCard;
