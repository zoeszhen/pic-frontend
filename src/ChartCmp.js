import React from "react";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

export const ChartCmp = (props) =>{
    let {data, groupNumber } = props;
    return(
        <div>
            <h2>Age range probability chart</h2>
            <BarChart width={1024} height={300} data={data}
                    margin={{top: 5, right: 20, left: 20, bottom: 5}}>
            <XAxis dataKey="age"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="percentage" fill="#8884d8" />
            </BarChart>
        </div>
        
    )
}