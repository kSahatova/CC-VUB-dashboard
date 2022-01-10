import React from 'react';
import styles from './components.css';


class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {select_value: 'sensor 1'};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({select_value: event.target.value, some_value: event.target.value},
            function () {
                console.log("handleChange :: state.select_value", this.state.select_value);
                this.props.selectChangeCallback(this.state.select_value)
            }
        );
    }


    render() {
        return (
        <select className='select' value={this.state.select_value} onChange={this.handleChange} style={styles.select}>
                <option value="sensor 1" >sensor 1</option>
                <option value="sensor 2" >sensor 2</option>
                <option value="sensor 3" >sensor 3</option>                
        </select>
            
        );
    }
}

export default DropDown
