import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Card, Box, Grid, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/featurePost";
import Divider from "@mui/material/Divider";
import RightPositionedTimeline from "../components/processTimeline";
import CardContent from "@mui/material/CardContent";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import backgroundImage from "../assets/cloudy_evening.JPG";

const mainFeaturedPost = {
  title: "A New Way To Tackle With Your Tasks",
  description:
    "Start your task outsourcing and co-working simply by joining our platform. Fast, easy, personalized and efficient!",
  image: `${backgroundImage}`,
  imageText: "main image description",
};

const defaultTheme = createTheme();

function HomePage() {
  const title = "Task Service Platform";

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="false">
        <Header title={title} />
      </Container>
      <Container maxWidth="xl">
        <main style={{ marginTop: "20px" }}>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        <Box
          sx={{
            // width: 400,
            height: 60,
            borderRadius: 1,
            bgcolor: "#F6F0E2",
            "&:hover": {
              bgcolor: "#F1E5C8",
            },
            md: 4,
            marginBottom: 4,
          }}
        />
        {/* <Divider/> */}
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={10}
        >
          <Grid>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "#434949",
                fontFamily: "Abril Fatface, serif",
                marginBottom: 3,
                marginLeft: 25,
                marginTop: 3,
              }}
            >
              Use cases
            </Typography>
            <Card
              sx={{
                width: 350,
                backgroundColor: "#F0F6E2 ",
                marginBottom: 8,
                marginLeft: 30,
              }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ color: "#7E934D " }}>
                  Efficient Task Outsourcing
                </Typography>
                <GroupsIcon />
                <Typography variant="body2" color="text.secondary">
                  Task service platforms revolutionize business outsourcing by
                  breaking large projects into smaller, manageable tasks
                  distributed among a global network of online workers. This
                  method boosts efficiency, reduces costs, and accelerates
                  delivery, making it ideal for tasks like data entry, content
                  moderation, and customer support. By leveraging these
                  platforms, businesses can seamlessly integrate on-demand
                  talent into their operations, enhancing flexibility and
                  responsiveness to market demands.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{ width: 350, backgroundColor: "#F0F6E2 ", marginLeft: 30 }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ color: "#7E934D " }}>
                  Business Process Optimization
                </Typography>
                <AutoAwesomeIcon />
                <Typography variant="body2" color="text.secondary">
                  Task service platform allows for quicker task completion and
                  better resource use, ensuring a competitive edge in the marke
                  by streamlining task allocation and management, improving
                  efficiency, and boosting user satisfaction.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <RightPositionedTimeline />
          </Grid>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
