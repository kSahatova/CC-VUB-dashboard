import React, {useCallback} from 'react';
import Header from "./components/Header.jsx";
import SideBar from "./components/SideBar.jsx";
import DropDown from "./components/DropDown.jsx";
import Events from './components/Events.jsx';
import FullnessBlock from './components/FullnessBlock.jsx';
import InfoBlock from './components/InfoBlock.jsx';
import ChartBlock from './components/ChartBlock.jsx';
import "antd/dist/antd.min.css";
import styles from './App.css';
import mqttService from './mqttService.js';

const client = mqttService.getClient();
const subject = mqttService.onConnect(client);
const topic = 'user_11d0ccff/#';

client.subscribe(topic);
mqttService.onMessage(client, subject);
mqttService.onError(client);

function App(){
  const [sensor, setSensor] = React.useState("sensor1");

  const handleSelectChangeCallback = useCallback((selectEvent) =>{
    console.log('callback test:', selectEvent)
    setSensor(selectEvent)
  }, []);

  React.useEffect(() => {
    console.log("handleSelectChangeCallback :: sensor", sensor);
  }, [sensor]);
  

    return(
      <div className="App">
        <Header />
        <SideBar /> 

          <div className='infoBlock' style={styles.infoBlock}>
            <div className='upperBlock' style={styles.upperBlock}>
            <DropDown className='dropDown' selectChangeCallback={handleSelectChangeCallback}/>
            <Events observable={subject}/>
            </div>
            <div className='cardsBlock' style={styles.cardsBlock}>
              <FullnessBlock className='fulnessBlock' title='Container Fulness' observable={subject} sensor={sensor}/>            
              <InfoBlock className='infoBlock' title='Main info' observable={subject} sensor={sensor}/>
            </div>
            <ChartBlock className='chartBlock' title='Weekly fulness statistics' sensor={sensor}/>
          </div>
      </div>  
    );
}


export default App;
