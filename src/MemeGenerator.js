import React, { Component } from 'react'


class MemeGenerator extends Component {
    constructor(){
        super()
        this.state ={
            topText : "",
            bottomText : "",
            randomImg : "http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemeImgs : memes
                })
            })
    }

    handleChange(event) {
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg }) 
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Top Text"
                        name="topText"
                        value={this.props.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Bottom Text"
                        name="bottomText"
                        value={this.props.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h3 className="top">{this.state.topText}</h3>
                    <h3 className="bottom">{this.state.bottomText}</h3>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
