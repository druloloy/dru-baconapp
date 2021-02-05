import React, { Component } from 'react'

export default class Image extends Component {
    constructor(props){
        super(props);

        this.state= {
            isLoaded: false,
            hasError: false
        }
    }

    componentDidMount(){
        let img = new Image();

        img.onload = () =>{
            this.setState({
                isLoaded: true
            })
        }
        img.onerror = () =>{
            this.setState({
                hasError: true
            })
        }

        img = this.props.src;
    }

    render() {
        if(!this.state.isLoaded){
            return <img className={this.props.className} style={this.props.style} alt={this.props.alt} src={this.props.unloadedsrc} /> 
        }
        else if(this.state.hasError){
            return <img className={this.props.className} style={this.props.style} alt={this.props.alt} src={this.props.unloadedsrc} /> 
        }

        return <img className={this.props.className} style={this.props.style} alt={this.props.alt} src={this.props.src} /> 
    }
}