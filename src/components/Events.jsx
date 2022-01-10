import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Drawer } from 'antd';
import {filter, scan, map} from 'rxjs/operators';
//import {from} from 'rxjs';

function useDangerMessage(observable){
    const [sensorsArray, setTheArray] = useState([]);

    useEffect( () => {
        const updateMsgArray = (newMsg) => {
        setTheArray(prevMsg => [...prevMsg, newMsg]);
        }
        const subscription = observable.pipe(
        filter((msg) => msg.includes("danger") ? msg : false),
        map(msg => {
            let sensor = (msg.split(" "))[0];
            sensor = (sensor.split("/"))[1];
            return sensor
        }));
        subscription.subscribe(updateMsgArray);
        
        return () => subscription.unsubscribe();
    }, [observable]);

    return sensorsArray;
}


const Events = (props)=>{ 
    const [visible, setVisible] = useState(false);
    const [countEvents, setCount] = useState(0)

    useEffect(()=>{
        const filteredStream = props.observable.pipe(
        filter((msg) => msg.includes("danger") ? msg : 0),
        map((msg) => (msg.split(" ")).pop()),
        scan(counter => counter + 1, 0));
        const subscription = filteredStream.subscribe(setCount);
        return () => subscription.unsubscribe();
    }, [props.observable]);


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    
    const sensorsArray = useDangerMessage(props.observable);
    
    return(
        <div className='events-block' style={{position: 'relative', width: '30%'}}>
            <Button className='events-button' onClick={showDrawer}    type='primary' 
            block style={{position: 'relative',}}>
                Events: {countEvents}
            </Button>
            <Drawer title="Events history" placement="right" onClose={onClose} visible={visible}>
            <ul style={{listStyleType: 'none'}}>
                {sensorsArray.map(sensor=>
                <li key={Math.random()}>
                    {sensor ? sensor +": danger message" : " "}
                </li>)} 
            </ul>
            </Drawer>
        </div>

    )
}

export default Events