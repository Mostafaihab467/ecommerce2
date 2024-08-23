import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { get_statstics } from '../../store/Action/statsticsAction';
import { IStatstics, ISystemStats } from '../../Models/StatsticsModel';
import './Dashboard.scss'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();

    const statics = useSelector((state: any) => state.statics.statstics) as IStatstics;
    const serverhealth = useSelector((state: any) => state.statics.serverHealth) as ISystemStats;
   
    useEffect(() => {
        // Initial fetch
        dispatch(get_statstics());
       setInterval((

       )=>{},1000)
        // Set up an interval to fetch the data periodically

    }, [dispatch]);

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
        labels: ["Total Products", 'Electronics', 'Fashion', 'Home Appliances', 'Books', 'Others'],
        datasets: [
            {
                label: 'Top Categories',
                data: [statics.totalProduct, statics.cloth, statics.electronics, 3, statics.books, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(122, 44, 33, 0.6)',
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
        labels: ['Pending', 'Paid', 'Delivered'],
        datasets: [
            {
                label: 'Order Status',
                data: [statics.pendingOrders, statics.paidgOrders, 1],
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
    const freeMemory = parseMemoryString(serverhealth.systemMemory?.freeMemory);
    const usedMemory = parseMemoryString(serverhealth.systemMemory?.usedMemory);
    const totalMemory = freeMemory + usedMemory;
 
    return (
        <Container>
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
                        <p>  Request/s </p>
                            <ProgressBar
                                now={((freeMemory / totalMemory) * 100) *2|| 0}
                                label={`${serverhealth.requestsPerSecond} req/s`}
                                variant='danger'
                            />
                            <p> Total Request </p>
                            <ProgressBar
                                now={((freeMemory / totalMemory) * 100) *2|| 0}
                                label={`${serverhealth.requestCount} req`}
                                className="custom-progress-bar"
                            />
                            <p className="mt-3">Memory Free</p>
                            <ProgressBar
                                now={((freeMemory / totalMemory) * 100) *2|| 0}
                                label={`${freeMemory.toFixed(2)} GB`}
                                variant="warning"
                                className="custom-progress-bar custom-progress-bar-warning"
                            />
                            <p className="mt-3">Used Memory</p>
                            <ProgressBar
                                now={(usedMemory / totalMemory) * 100 || 0}
                                label={`${usedMemory.toFixed(2)} GB`}
                                variant="success"
                                className="custom-progress-bar custom-progress-bar-success"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card className="text-center">
                        <Card.Body>
                            <Link to="/AdminsEditScreen">
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
const parseMemoryString = (memoryString: any) => {
    if (!memoryString) return 0; // Handle empty or undefined strings

    const memoryValue = parseFloat(memoryString); // Extract the numeric part
    if (memoryString.includes('GB')) {
        return memoryValue ; // Convert GB to MB
    } else if (memoryString.includes('MB')) {
        return memoryValue; // Already in MB, no conversion needed
    }
    return 0; // Fallback if format is unexpected
};
export default Dashboard;
// <Container fluid>

