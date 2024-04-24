import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function RightPositionedTimeline() {
  return (
    <Timeline position="right">
        <Typography gutterBottom variant="h5" component="div" sx={{
                color: "#434949",
                fontFamily: "Abril Fatface, serif"
            }}>
                How does it work?
            </Typography>
      <TimelineItem>
            {/* <Card sx={{ width: 350, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                    borderRadius: '12px'}} variant="soft">
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Sign up as a new user and choose your profile (employer to publish tasks or employee 
                        to take and complete tasks)
                    </Typography>
                </CardContent>
            </Card> */}
        <TimelineSeparator>
          <TimelineDot color='info' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Stack direction="column" spacing={2}>
                <Typography>
                    Create an Account
                </Typography>
                <Card sx={{ width: 400, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                    borderRadius: '12px'}} variant="soft">
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Sign up as a new user and choose your profile (employer to publish tasks or employee 
                            to take and complete tasks)
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
            {/* <Card sx={{ width: 350, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                borderRadius: '12px'}}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Create a new task and publish your task if you are an employer
                        </Typography>
                    </CardContent>
            </Card> */}
        <TimelineSeparator>
          <TimelineDot color='info'/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Stack direction="column" spacing={2}>
                <Typography>
                    Publish Your Task 
                </Typography>
                <Card sx={{ width: 400, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                borderRadius: '12px'}}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Create a new task and publish your task if you are an employer
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
            {/* <Card sx={{ width: 350, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                borderRadius: '12px'}}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Interested users take the tasks from our active task pool and assign to themselves
                        </Typography>
                    </CardContent>
            </Card> */}
        <TimelineSeparator>
          <TimelineDot color='info' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Stack direction="column" spacing={2}>
                <Typography>
                    Task Taken by User
                </Typography>
                <Card sx={{ width: 400, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                    borderRadius: '12px'}}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Interested users take the tasks from our active task pool and assign to themselves
                            </Typography>
                        </CardContent>
                </Card>
            </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
            {/* <Card sx={{ width: 350, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                borderRadius: '12px'}}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            System changes the status to 'assigned',  assignee can start working on the assigned task
                        </Typography>
                    </CardContent>
            </Card> */}
        <TimelineSeparator>
          <TimelineDot color='info'/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Stack direction="column" spacing={2}>
                <Typography>
                    Task Assigned
                </Typography>
                <Card sx={{ width: 400, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                    borderRadius: '12px'}}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                System changes the status to 'assigned',  assignee can start working on the assigned task
                            </Typography>
                        </CardContent>
                </Card>
            </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
            {/* <Card sx={{ width: 350, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                borderRadius: '12px'}}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            After task is submitted by the assignee, task publisher can review and approve. Once approved, the task will 
                            be marked as 'completed'. Bingo !
                        </Typography>
                    </CardContent>
            </Card> */}
        <TimelineSeparator>
          <TimelineDot color='info'/>
        </TimelineSeparator >
        <TimelineContent>
            <Stack direction="column" spacing={2}>
                <Typography>
                    Task Completed
                </Typography>
                <Card sx={{ width: 400, backgroundColor: 'rgba(255, 165, 0, 0.5)',  boxShadow: '0 4px 6px rgba(0,0,0,0)',
                    borderRadius: '12px'}}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                After task is submitted by the assignee, task publisher can review and approve. Once approved, the task will 
                                be marked as 'completed'. Bingo !
                            </Typography>
                        </CardContent>
                </Card>
            </Stack>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}