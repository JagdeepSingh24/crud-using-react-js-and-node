import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PieChart, RadialBarChart,RadialBar, Pie, Cell, BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from 'axios';
const Home = () => {
  const [verified, setVerified] = useState("");
  const [notVerified, setNotVerified] = useState("");
  useEffect(() => {
    count();
  }, [])
  const count = () => {
    axios.get("http://localhost:3000/count", {

    })
      .then(async (response) => {
        console.log(response.data);
        console.log(response.data.notVerified);
        setNotVerified(response.data.notVerified);
        console.log(response.data.verified);
        setVerified(response.data.verified);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  let v1 =(notVerified / (verified + notVerified)) * 100;
  v1 = v1.toFixed(2)
  let v2= (verified / (verified + notVerified)) * 100;
  v2 = v2.toFixed(2)
  const data = [
    
    { name: 'Not Verified', value: notVerified },
    { name: 'Verified', value: verified },
  ];
  // '#0088FE', '#00C49F', '#FFBB28', '#FF8042'
  const COLORS = ['#82ca9d', '#FFBB28'];
  
  
  
  return <div className="bg-white">
    <div className='text-center text-info h1'>Dashboard</div>

    <div className='h4'><p className='text-warning'>Verified = {v2}%</p><p className='text-primary '>Not Verified = {v1}%</p></div>
    <ResponsiveContainer width={850} height={300}>
    <BarChart width={150} height={40} data={data}>
          <Bar dataKey="value" fill="#8884d8" label />
          <XAxis dataKey="name" fill="#8884d8"/>
          <YAxis  />
        </BarChart>        
    </ResponsiveContainer>
    <RadialBarChart 
  width={730} 
  height={250} 
  innerRadius="40%" 
  outerRadius="80%" 
  data={data} 
  startAngle={180} 
  endAngle={0}
>
  <RadialBar minAngle={45} label={{  position: 'insideStart' }} background clockWise={true} dataKey='value' fill="#FFBB28"/>
  <Tooltip />
</RadialBarChart>
    <PieChart width={850} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100} fill="white" label >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

    </PieChart>
    <div>
    
    </div>
    
  </div>
}

export default memo(Home);