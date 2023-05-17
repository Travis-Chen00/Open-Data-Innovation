import React, { Component } from 'react';
import {Card} from 'antd';
import './predicate.scss'
class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            output: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick = () => {
        const randomNumber = Math.floor(Math.random() * (20000 - 10000 + 1)) + 60000;
        this.setState({
            output: `The predicted price is ￡${randomNumber}`
        });
    }

    render() {
        // const titleStyle = {
        //     margin:'100px 0px' 
        // }

        const inputStyle = {
            margin: '10px 0',
            padding: '5px',
            fontSize: '16px',
            width: '500px'
        };

        const buttonStyle = {
            margin: '20px 0px 0px 25px',
            padding: '10px 200px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
        };

        const divstyle = {
            margin:'100px 0',
            padding: '100px',
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'space-between'
        }

        const outputStyle = {
            backgroundColor: 'gray',  // 设置背景色为灰色
            padding: '70px',  // 设置内边距为10像素
            borderRadius: '5px',  // 设置边角半径为5像素
            color: '#fff',  // 设置文本颜色为白色
            fontFamily: '',
            width: '250px',
            fontSize:'15px'
        };


        
        return (
            <div className='predict'>
                <Card>
                <div className='input'></div>
                <h1>Value Your Property</h1>
                <p>Fill out the form to view the valuation of your hous</p>
                <div>  
                <input style={inputStyle} type="text" name="input1" onChange={this.handleInputChange} placeholder="House Type (e.g flat,house..)" />
                <br/>
                <input style={inputStyle} type="text" name="input2" onChange={this.handleInputChange} placeholder="Area" />
                <br/>
                <input style={inputStyle} type="text" name="input3" onChange={this.handleInputChange} placeholder="No.of Bedrooms" />
                <br/>
                <input style={inputStyle} type="text" name="input4" onChange={this.handleInputChange} placeholder="No.of Bathrooms" />
                <br/>
                <input style={inputStyle} type="text" name="input5" onChange={this.handleInputChange} placeholder="No.of Receptions" />
                <br/>
                <input style={inputStyle} type="text" name="input6" onChange={this.handleInputChange} placeholder="Latitude" />
                <br/>
                <input style={inputStyle} type="text" name="input7" onChange={this.handleInputChange} placeholder="Longitude" />
                <br/>
                <button style={buttonStyle} onClick={this.handleClick}>Submit</button>
             </div>
            <div className='output'>
                    <h1>Result</h1>
                    <div  style={outputStyle}>
                    {this.state.output}
                </div>
            </div>

                </Card>
        </div>
        );
    }
}

export default MyForm;
