import React, { Component } from "react";

class Newstag extends Component {

    constructor(props) {
        super(props);
        this.state = { stocknewstag: [],isLoaded: false,};
        
        let stocknewstag = 'http://localhost:3015/stocknewstag/' + this.state.term;
        fetch(stocknewstag)
            .then(response => response.json())
            .then(stocknewstag => (this.setState({ stocknewstag,isLoaded: true}))
            )
    }
    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div className = "gallery"> Loading...
                <center>
                <img src="https://isometric.online/wp-content/uploads/2019/07/Web_SVG.svg" alt="https://isometric.online/"/> 
                </center>
            </div>
        }
        return (
            <div className="App">             
                {this.state.stocknewstag.map(item => (
                <div class="row justify-content-center" style={{background: "#ecf0f1"}}>
                    <div class="col-6">
                    <center>
                        <img src={item.URL_img} width={400} height={250}  alt="" title="Google Images"   />
                    </center>
                    </div>
                    <div className="col-6 headerthe" key={item.title}> 
                        <a style={{ textDecoration: "none", color: "red", fontSize: 20}} href={item.URL_web} target="_blank" >
                            {item.Title}
                        </a>
                        <br/> <br/>
                        <a>
                            {(item.Date.toString().split('T')[0])} 
                        </a>
                        <br/> <br/>
                        <a>
                            {item.Detail}
                        </a>           
                    </div>
                    <div class="text-center">
                    ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
                    </div>
                    <br /> <br /> <br/> <br/>
                </div>
            ))}
        </div>);
        
    }
}

export default Newstag;