import React from 'react'
import { Progress } from 'antd'
import {filter, map} from 'rxjs/operators';
import styles from './components.css'

const ProgressBar = props => {
    return(
    <div>
        <Progress  type='dashboard' showInfo={true} percent={props.percent} width={180} status="normal"
                strokeLinecap='round' strokeColor={{'0%': '#ff446c', '100%': '#108ee9',}}
                style={{
                    position: 'relative',
                    display: `${props.visibility}`
            }} />
    </div>
    )
}

function FullnessBlock(props){

    const [fulness, setFulness] = React.useState(0);

    React.useEffect(()=>{
        console.log(props.sensor);
        const filteredStream = props.observable.pipe(
        filter( msg => msg.includes(props.sensor) && msg.includes('fill_level') ?  msg : 0),
        map((msg) => {
            let    fulness = (msg.split('/')[2]).split(" ")[1];
            return fulness
        }),
        );

        const subscription = filteredStream.subscribe(setFulness);

        return () => subscription.unsubscribe();
    }, [props.observable, props.sensor]);

    return (
        <div className='cardBlock' style={styles.cardBlock}>
            <p style={{fontSize:"17px", margin: "10px 0px 0px 15px"}}>{props.title}</p>
            <hr style={{margin: "0px 20px 0px 10px"}}/>
            <div style={{width: "90%", height: "80%", display: 'flex', justifyContent: "center", marginLeft: "15px", marginTop: "10px"}}>
                <ProgressBar visibility='auto' percent={fulness}/>
            </div>
        </div>
    )
}

export default FullnessBlock