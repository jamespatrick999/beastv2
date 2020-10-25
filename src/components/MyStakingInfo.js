import React, { Component } from 'react'

// const contract_address = 'TVh8VQ2rJ7mvcaQfmVGzsurL5FJKZhe6tn';

// let contracturl = "https://tronscan.org/#/contract/" + contract_address;

class MyStakingInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

    }

    render() {


        const colStyle = {
            backgroundImage: "linear-gradient(to right, black, #474708)", opacity: "70%", marginTop: "60px", borderRadius: "20px", marginLeft: "20px", marginRight: "20px",
            boxShadow: "0 0 20px #eee",
        };

        return (

            <div>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <div className="col-xl-6" style={{ marginTop: "-18px", backgroundImage: "linear-gradient(to right, black, #474708)", borderRadius: "5px", color: "white", textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
                            My Deposit Stats</div>

                        <br />

                        <div className="col-xl-12" >
                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Base Staking </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}> +1.00 %</p>
                            <br /><br />

                            <p style={{ color: "white", fontSize: "17px", float: "left" }}>Contract Bonus </p>
                            <p style={{ color: "white", fontSize: "17px", float: "right" }}>
                                +{this.props.contract_bonus} %</p>
                            <br /><br />



                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div >
        )
    }
}

export default MyStakingInfo
