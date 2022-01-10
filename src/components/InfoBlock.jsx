import React from 'react';
import {WiThermometer} from 'weather-icons-react';
import {WiHumidity} from 'react-icons/wi';
import {GiBatteryPackAlt} from 'react-icons/gi';
import {MdDeleteOutline} from 'react-icons/md';
import {filter, map, bufferCount} from 'rxjs/operators';



const divHoriz = {display: 'flex',
                flexDirection:'row',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                width: '78%',
                //backgroundColor: 'green',
                position: 'relative',
                top: '5%',
                left: '10%',
                margin: '0px 0px 20px 0px'}

const divMain = {
    position: 'relative',
    backgroundColor: 'white',
    width: '48%',
    height: '250px',
    borderRadius: '3px',
    }

const InfoBlock = (props)=>{
    const [values, setValues] = React.useState({"temp": "0", "humidity": "0", "bat": "0", "flag_unloading": "0"})

    React.useEffect(()=>{
        const filteredStream = props.observable.pipe(
        filter( msg => msg.includes(props.sensor) && /temp|humidity|bat|flag_unloading/.test(msg) ?  msg : false),
        map((msg) => {
            return msg.split('/')[2]
        }),
        bufferCount(4),
        map((array) => {
            let object = {}
            Object.keys(array).forEach(function(key) {
                let k = array[key].split(" ")[0]
                let v = array[key].split(" ")[1]
                object[k] = v;
                //console.log(k, v);
            });
            return object;
        }));

        const subscription = filteredStream.subscribe(setValues);

        return () => subscription.unsubscribe();
    }, [props.observable, props.sensor]);

    return (
        <div className='info-block' style={divMain}>
            <p style={{fontSize:"17px", margin: "10px 0px 0px 15px"}}>{props.title}</p>
            <hr style={{margin: "0px 20px 0px 10px"}}/>
            <div style={divHoriz}>
                <div style={{display: 'flex', flexDirection:'row',}}>
                    <div className="temperature" style={{ margin: "0px 0px 0px 0px "}}>
                        <WiThermometer size={60} color={"#1890FF"} style={{position: 'relative', marginLeft: '-10px'}}/>
                    </div>
                    <p style={{fontSize: "30px", }}>{values.temp}&deg;C </p>
                </div>
                <div style={{display: 'flex', flexDirection:'row', width:'40%'}}>
                    <div className="humidity" style={{margin: "0px 0px 0px 0px"}}>
                        <WiHumidity size={59} color={"#1890FF"} style={{position: 'relative'}}/>
                    </div>
                    <p style={{fontSize: "30px",  }}>{values.humidity}</p>
                </div>
            </div>
            <div style={divHoriz}>
                <div style={{display: 'flex', flexDirection:'row', }}>
                    <div className="battery" style={{ margin: "0px 0px 0px 0px "}}>
                            <GiBatteryPackAlt size={50} color={"#1890FF"}/>
                    </div>
                    <p style={{fontSize: "30px",}}>{values.bat}%</p>
                </div>
                <div style={{display: 'flex', flexDirection:'row',}}>
                    <div className="unloading" style={{margin: "0px 0px 0px 0px"}}>
                        <MdDeleteOutline size={55} color={"#1890FF"}/>
                    </div>
                    <p style={{fontSize: "30px", }}>{values.flag_unloading === "0" ? "no": "yes" }</p>
                </div>
            </div>
        </div>
    )
}

export default InfoBlock