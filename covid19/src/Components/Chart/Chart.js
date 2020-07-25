import Chart from "react-google-charts";
import Api from '../../Api/index'
import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

const CovidChart = () => {
    const  [data, setdata] = useState([]);

    let { id } = useParams();


    useEffect(() => {
        let newRows = [];
        Api.CountriesByCode(id).then((response) => {
            newRows.push(['Number of people', 'Country'])
            newRows.push(['Diabetes prevalence', response.diabetes_prevalence])
            newRows.push(['Median age', response.median_age])
            setdata(newRows)
        })
      }, []);
  
    return (

        (data.length > 0) ? (<div>
            <div style={{ display: 'flex', maxWidth: 900 }}>
                <Chart
                    width={800}
                    height={700}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        title: 'Status of ' + id,
                        chartArea: { width: '30%' },
                        hAxis: {
                            title: 'Total Population',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Number of people',
                        }
                    }}
                    legendToggle
                />
                </div>
        </div>) : <div>Waiting...</div>
    );
  };
  
  export default CovidChart;