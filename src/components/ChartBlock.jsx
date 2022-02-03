import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Chart , Line } from "react-chartjs-2";
import styles from './components.css'
import {of, timer, interval, ReplaySubject} from 'rxjs';
import {filter, groupBy, mergeMap,reduce,bufferCount, map, takeUntil} from 'rxjs/operators';




function generateSyntheticGraphData(){
    const sensors = of("sensor1", "sensor 2", "sensor 3")
    const  week = of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    const value = week.pipe(
        mergeMap(x => interval(500).pipe(map(i => x+","+Math.floor(Math.random() * (100 - 0) + 0)))
    ))
    
    const result = sensors.pipe(
        mergeMap(x => value.pipe(map(i => x+","+i)))
    )
    const timer$ = timer(3000);
    const finish = result.pipe(takeUntil(timer$));
    
    const replaySubject = new ReplaySubject();    
    finish.subscribe(replaySubject);
    
    return replaySubject
}

const ChartBlock = (props)=>{
    const [sensorData, setSensorData] = React.useState([])
    
    React.useEffect(()=>{        
        const obs$ = generateSyntheticGraphData().pipe(
            filter((msg) => msg.includes(props.sensor) ? msg : false),
            map(msg => {
                return {day: msg.split(",")[1], fulness: msg.split(",")[2]}        
            }),    
            groupBy(obj => obj.day, obj => obj.fulness),
            mergeMap(group$ =>
                group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))),
            map(arr => ({ id: arr[0], values: arr.slice(1)})),
            map(obj => {
                    let intVal = obj.values.map(val => parseInt(val, 10));
                    let meanVal = intVal.reduce((acc, cur)=> acc+cur, 0) / obj.values.length;
                    return Math.round(meanVal)
                }    
            ),
            bufferCount(7)
        )    
        obs$.subscribe(setSensorData);
        return obs$.unsubscribe();
    }, [props.sensor]);

    return (
        <div className='chart' style={styles.chart}>
            <p style={{fontSize:"17px", margin: "10px 0px 0px 15px"}}>{props.title}</p>
            <hr style={{margin: "0px 20px 0px 10px"}}/>
            <Line
                data={{
                // x-axis label values
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
                datasets: [
                    {
                        label: "Container fulness",
                        // y-axis data plotting values
                        data: sensorData, //[100, 0, 30, 50, 60, 80, 90],
                        fill: false,
                        borderWidth:4,
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor:'#108ee9',
                        responsive:true
                        },
                    ],
                    }}
                style={{position: 'relative', top: '10px'}}
            />
        </div>
    )
}

export default ChartBlock
