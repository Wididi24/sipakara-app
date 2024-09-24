"use client"; // Indicate this is a client component

import { useEffect, useState } from 'react';
import styles from './chart.module.css';
import { Bar, BarChart, Legend, Rectangle, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
      <g transform={`translate(${x},${y})`} className={styles.yAxisTick}>
          <text fill="white" fontWeight="bold" fontSize="9pt" textAnchor="end"> {/* Changed fontSize to 8pt */}
              {`Rp ${payload.value.toLocaleString()}`}
          </text>
      </g>
  );
};

const Chart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/chart');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();
    }, []);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.tooltip}>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>{`${payload[0].payload.month}`}</p>
                    <p style={{ color: '#17ba17', fontWeight: 'bold' }}>
                        {`Simpan: Rp ${payload[0].payload.simpan.toLocaleString()}`}
                    </p>
                    <p style={{ color: '#ff4500', fontWeight: 'bold' }}>
                        {`Pinjam: Rp ${payload[1].payload.pinjam.toLocaleString()}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Total Transaksi Bulanan</h2>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 20, left: 40, bottom: 0 }} // Increased left margin
                    >
                        <CartesianGrid stroke="grey" strokeDasharray="0 0" />
                        <XAxis 
                            dataKey="month" 
                            tick={{ fill: 'white', fontWeight: 'bold', fontSize: '15px' }} // Set fontSize as a string
                        />
                        <YAxis 
                            tick={<CustomYAxisTick />} // Use the custom Y-axis tick component
                            width={60} // Increased width for Y-axis 
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="simpan" fill="#17ba17">
                            {(props) => {
                                const { fill, x, y, width, height } = props;
                                return <Rectangle fill={fill === '#8884d8' ? 'pink' : fill} stroke={fill === '#8884d8' ? 'blue' : 'none'} x={x} y={y} width={width} height={height} />;
                            }}
                        </Bar>
                        <Bar dataKey="pinjam" fill="#ff4500">
                            {(props) => {
                                const { fill, x, y, width, height } = props;
                                return <Rectangle fill={fill === '#82ca9d' ? 'gold' : fill} stroke={fill === '#82ca9d' ? 'purple' : 'none'} x={x} y={y} width={width} height={height} />;
                            }}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
