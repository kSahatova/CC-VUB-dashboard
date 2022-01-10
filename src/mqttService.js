import * as mqtt from "mqtt"
import {Subject} from 'rxjs';


const host = 'wss://srv2.clusterfly.ru:9994/mqtt' 
const clientId = 'mqttjs_' + Math.random().toString(16).substring(2, 8)
const topic = 'user_11d0ccff/+';
const options = {
    clientId: clientId,
    username: 'user_11d0ccff',
    password: 'pass_7dad883c',
    reconnectPeriod: 10000,
    connectTimeout: 30 * 1000,
}


function getClient() {
    const client = mqtt.connect(host, options);
    console.log(`Client created`);
    return client;
}

function subscribe(client) { 
    console.log(`Client subscribed to the topic '${topic}'`)   
    client.subscribe(topic);
}

function onMessage(client, subject) {
    client.on("message", (topic, message) => {
        console.log(topic + " " +message)
        subject.next(topic + " " +message);
    });
}

function onConnect(client){
    const subject = new Subject();
    client.on('connect', (connack)=>{
        console.log('Connection installed')
        subject.subscribe();}); //{next: (m) => console.log(`message: ${m}`)}
    return subject;
}

function onError(client){
    client.stream.on("error", (err) => {
        console.log(`Connection to ${host} failed. Error:`, err);
        client.end();
    });
}

function unsubscribe(client, topic, subject) {
    client.unsubscribe(topic);
    subject.unsubscribe();
}

function closeConnection(client) {
    client.end();
}

const mqttService = {
    getClient,
    subscribe,
    onMessage,
    unsubscribe,
    closeConnection,
    onConnect,
    onError
};
export default mqttService;

