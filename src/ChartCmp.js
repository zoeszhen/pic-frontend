import React from "react";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

export const ChartCmp = (props) =>{
    let {data, groupNumber } = props;
    return(
        <div>
            <h2>Group {groupNumber}: age from {data[0].age} to {data[0].age}</h2>
            <BarChart width={1000} height={300} data={data}
                    margin={{top: 5, right: 20, left: 20, bottom: 5}}>
            <XAxis dataKey="age"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="prcentage" fill="#8884d8" />
            </BarChart>
        </div>
        
    )
}