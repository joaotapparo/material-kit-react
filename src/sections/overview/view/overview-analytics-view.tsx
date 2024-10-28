import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

interface Job {
  clientName: string;
  jobId: number;
  startTime: string;
}

export function OverviewAnalyticsView() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('http://cpsqadawx01.cpfl.com.br:5000/api/jobs');
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Erro ao buscar dados dos jobs:', error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Numero Sucesso"
            percent={2.6}
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/warning.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Fail Jobs"
            percent={2.6}
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/warning.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title=""
            chart={{
              series: [
                { label: 'job1', value: 3500 },
                { label: 'job2', value: 2500 },
                { label: 'job3', value: 1500 },
                { label: 'job4', value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Jobs por server"
            subheader=""
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'master 1', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'master 2', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        {/* Tabela de Jobs */}
        <Grid xs={12}>
          <Typography variant="h6" gutterBottom>
            Jobs Recentes
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Tabela de Jobs">
              <TableHead>
                <TableRow>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Job ID</TableCell>
                  <TableCell>Start Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.jobId}>
                    <TableCell>{job.clientName}</TableCell>
                    <TableCell>{job.jobId}</TableCell>
                    <TableCell>{new Date(job.startTime).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
