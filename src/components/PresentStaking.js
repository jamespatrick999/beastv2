import React, { Component } from 'react'

class PresentStaking extends Component {


    render() {

        const colStyle = {
            backgroundImage: "radial-gradient(black, #131050 )", opacity: "70%", marginTop: "20px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        return (

            <div style={{ paddingTop: "80px" }}>
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4" style={colStyle}>

                        <div className="col-xl-12" style={{ marginTop: "-18px", marginLeft: "-5px", backgroundImage: "linear-gradient(to right, #131050, black)", borderRadius: "5px", color: "white", textAlign: "center", fontWeight: "bold", fontSize: "16px", }}>
                            Current Staking Bonus</div>
                        <br />

                        <div style={{ color: "white", fontSize: "29px", fontFamily: "MyFont", textAlign: "center" }}> {this.props.dailyRate} % Daily</div>
                        <br />

                    </div>
                    <div className="col-xl-4"></div>
                </div>

            </div >

        )
    }
}

export default PresentStaking
