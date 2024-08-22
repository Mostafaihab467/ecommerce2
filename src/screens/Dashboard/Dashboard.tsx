import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { get_statstics } from '../../store/Action/statsticsAction';
import { IStatstics } from '../../Models/StatsticsModel';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
    const statics = useSelector((state:any)=>state.statics.statstics) as IStatstics
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Others'],
    datasets: [
      {
        label: 'Top Categories',
        data: [statics.cloth,statics.electronics, 3, statics.books, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['In Progress', 'Completed', 'Pending'],
    datasets: [
      {
        label: 'Order Status',
        data: [50, 25, 25],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: ['Product Quality', 'Customer Service', 'Delivery Time', 'Pricing', 'Variety'],
    datasets: [
      {
        label: 'Customer Satisfaction',
        data: [4, 5, 3, 4, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

const dispatch = useDispatch()

 useEffect(() => {


 dispatch(get_statstics())
 },[dispatch]) 

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Monthly Sales Overview</Card.Header>
            <Card.Body>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Top Product Categories</Card.Header>
            <Card.Body>
              <Bar data={barChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Order Status</Card.Header>
            <Card.Body>
              <Doughnut data={doughnutChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Customer Satisfaction</Card.Header>
            <Card.Body>
              <Radar data={radarChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Server Health</Card.Header>
            <Card.Body>
              <p>CPU Usage</p>
              <ProgressBar now={60} label="60%" />
              <p className="mt-3">Memory Usage</p>
              <ProgressBar now={80} label="80%" variant="warning" />
              <p className="mt-3">Disk Space</p>
              <ProgressBar now={40} label="40%" variant="success" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="text-center">
            <Card.Body>
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Manage Products
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
