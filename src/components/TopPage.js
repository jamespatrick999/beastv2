import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./Image1/thunder.jpg"
import TronWeb from 'tronweb';
import Utils from './utils';
import SmartInfo from "./SmartInfo";
import Invest from "./Invest";
import LevelStats from "./LevelStats";
import TBTstats from "./TBTstats";
import PersonalStats from "./PersonalStats";
import ReferralLink from "./ReferralLink";
import Withdraw from "./Withdraw2";
import IncomeandTeamStats from "./IncomeandTeamStats.js";
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

let url = "https://tronbeast.live/"; // https://tronbeast.live/
let contract_address = 'TRCkjNzmikzmwUKB7dvmrxBF4z6sFBGijX';
let tbt_address = 'TJEDMQLLkGC3frpSnEhJes8fTWHPpQ5C6P';

toast.configure();

class TopPage extends Component {

    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();
    }

    connectTronWeb = async () => {
        await new Promise(resolve => {
            const tronWebState = {
                installed: window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (tronWebState.installed) {
                this.setState({
                    tronWeb:
                        tronWebState
                });
                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if (tries >= 310) { //310
                    // const TRONGRID_API = 'https://api.trongrid.io';
                    const TRONGRID_API = 'https://3.225.171.164';
                    window.tronWeb = new TronWeb(


                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if (!this.state.tronWeb.installed) {
            toast.error("Tron blockchain support not enabled, Try using Token Pocket/ Tron Wallet/ Tron Link Pro for Mobile OR Tron Link chrome extension for PC");
        }

        if (!this.state.tronWeb.loggedIn) {
            window.tronWeb.on('addressChanged', () => {
                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }

        await Utils.setTronWeb(window.tronWeb);
    }

    loadBlockChainData = async () => {

        const sunny = 1000000;

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });
            this.setState({ referPresent: true });

        }

        else {
            this.setState({ refid: this.state.owner });
        }
        this.setState({ refLoading: false });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
        this.setState({ walletload: false });

        const contractBalance = await Utils.contract.getContractBalance().call();
        this.setState({ contractBalance: Number(contractBalance / sunny).toFixed(2) });

        const totalUsers = await Utils.contract.total_users().call();
        this.setState({ totalUsers: Number(totalUsers) });

        var totalInvested = await Utils.contract.total_deposited().call();
        this.setState({ totalInvested: Number(totalInvested) / sunny });

        var twenty_four_hours_deposit_value = await Utils.contract.twenty_four_hours_deposit_value().call();
        this.setState({ t4_value: Number(twenty_four_hours_deposit_value) / sunny });

        var min_deposit = await Utils.contract.min_deposit().call();
        this.setState({ min_deposit: Number(min_deposit) / sunny });

        var HCB = await Utils.contract.H_C_B().call();
        this.setState({ HCB: Number(HCB) / sunny });

        var LowerHCB = await Utils.contract.Lower_H_C_B().call();
        this.setState({ LowerHCB: Number(LowerHCB) / sunny });

        var HigherHCB = await Utils.contract.Higher_H_C_B().call();
        this.setState({ HigherHCB: Number(HigherHCB) / sunny });

        // var contract_status = await Utils.contract.contract_status().call();
        // this.setState({ contract_status });


        var total_tbt_sent = await Utils.contract.total_tbt_sent().call();
        this.setState({ total_tbt_sent: Number(total_tbt_sent) / sunny });

        var tbt_price = await Utils.contract.tbt_price().call();

        this.setState({ tbt_price: Number(tbt_price) / sunny });
        // console.log(this.state.tbt_price)

        this.setState({ totalPaid: Number(this.state.totalInvested - this.state.contractBalance).toFixed(1) });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

        let subAccountstr = this.state.account.toString();
        let subAccount = subAccountstr.substring(0, 8);
        this.setState({ subAccount });

        let contractStr = contract_address.toString();
        let subContract = contractStr.substring(0, 8);
        this.setState({ subContract });

        let tbtStr = tbt_address.toString();
        let subtbt = tbtStr.substring(0, 8);
        this.setState({ subtbt });


        const userInfoTotals = await Utils.contract.userInfoTotals(this.state.account).call();

        this.setState({ userTotalDeposit: Number(userInfoTotals.total_deposits) / sunny });
        this.setState({ referrals_count: Number(userInfoTotals.referrals) });
        this.setState({ userTotalWithdrawn: Number(userInfoTotals.total_payouts) / sunny });
        this.setState({ total_structure: Number(userInfoTotals.total_structure) });

        /////////////////////////////////////////////////////////////////////////////
        const userInfo = await Utils.contract.userInfo(this.state.account).call();

        this.setState({ upline: window.tronWeb.address.fromHex(userInfo.upline) });
        this.setState({ subUpline: this.state.upline.toString().substring(0, 8) });
        this.setState({ direct_bonus: Number(userInfo.direct_bonus) / sunny });
        this.setState({ deposit_amount: Number(userInfo.deposit_amount) / sunny });
        this.setState({ payouts: Number(userInfo.payouts) / sunny });
        this.setState({ deposit_time: Number(userInfo.deposit_time) });
        this.setState({ user_status: userInfo.user_status });
        this.setState({ payout_time: Number(userInfo.payout_time) });

        var contract_status = await Utils.contract.contract_status().call();
        this.setState({ contract_status });

        /////////////////////////////////////////////////////////////////////////////
        const userInfo2 = await Utils.contract.userInfo2(this.state.account).call();
        console.log(this.state.deposit_amount);

        this.setState({ temp_directs_count: Number(userInfo2.temp_directs_count) });
        this.setState({ daily_roi: Number(userInfo2.daily_roi / 10) });

        var fifteen_percent = await Utils.contract.fifteen_percent().call();
        this.setState({ fifteen_percent: Number(fifteen_percent) / 10 });

        var six_percent = await Utils.contract.six_percent().call();
        this.setState({ six_percent: Number(six_percent) / 10 });

        if (this.state.contract_status === false) {
            this.setState({ daily_roi: this.state.daily_roi / 2 });
            this.setState({ six_percent: this.state.six_percent / 2 });
            this.setState({ fifteen_percent: this.state.fifteen_percent / 2 });
        }

        ///////////////////////////////////////////////////////////////////////////// 

        const levelInfo = await Utils.contract.levelInfo(this.state.account).call();

        this.setState({ level1: Number(levelInfo.level1) / sunny });
        this.setState({ level2: Number(levelInfo.level2) / sunny });
        this.setState({ level3: Number(levelInfo.level3) / sunny });

        const cycleInfo = await Utils.contract.cycleInfo().call();

        this.setState({ cycle1: Number(cycleInfo.cycle1) / sunny });
        this.setState({ cycle2: Number(cycleInfo.cycle2) / sunny });
        this.setState({ cycle3: Number(cycleInfo.cycle3) / sunny });
        this.setState({ cycle4: Number(cycleInfo.cycle4) / sunny });
        this.setState({ cycle5: Number(cycleInfo.cycle5) / sunny });

        /////////////////////////////////////////////////////////////////////////////
        const tbtInfo = await Utils.contract.tbtInfo(this.state.account).call();
        // console.log(tbtInfo)

        this.setState({
            from_deposit: Number(tbtInfo.from_deposit) / sunny
        });
        this.setState({
            from_withdrawal: Number(tbtInfo.from_withdrawal) / sunny
        });
        this.setState({
            total_tbt: Number(tbtInfo.total_tbt1) / sunny
        });
        this.setState({
            tbt_bal: Number(tbtInfo.tbt_bal) / sunny
        });
        this.setState({
            contract_tbt_bal: Number(tbtInfo.contract_tbt_bal) / sunny
        });

        var tbt_min_deposit = await Utils.contract.tbt_min_deposit().call();
        this.setState({ tbt_min_deposit: Number(tbt_min_deposit) / sunny });

        const now = await Utils.contract.getNow().call();
        this.setState({ now: Number(now) });
        // console.log("cycle 1 " + this.state.tbt_min_deposit);

    }

    constructor(props) {
        super(props)

        this.state = {
            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestmentLoad: true,
            playerStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,

            balance: 0,
            refFlag: 0,
            totalInvested: 0,

            count: 0,
            lastDepositTime: 0,
            depositCount: 0,
            totalRate: "....",

            copySuccess1: false,
            totalUsers: "....",
            contractBalance: "....",
            totalPaid: "....",
            referPresent: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }
    }

    render() {
        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont", height: "auto", width: "100%", margin: "0", backgroundPosition: "center", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        };

        return (
            <div>
                <div style={backStyle}>
                    <hr />
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <a href={url} >  <img src={require("./Image1/reallogo.png")} alt="Logo" width="360px" /></a>
                    </div>

                    {this.state.user_status === true ?
                        <Withdraw

                        /> : null}

                    {this.state.user_status === false && (this.state.referPresent === true || this.state.deposit_amount > 0) ?
                        <Invest
                            balance={this.state.balance}
                            min_deposit={this.state.min_deposit}
                            t4_value={this.state.t4_value}
                            cycle1={this.state.cycle1}
                            cycle2={this.state.cycle2}
                            cycle3={this.state.cycle3}
                            cycle4={this.state.cycle4}
                            cycle5={this.state.cycle5}

                            refLoading={this.state.refLoading}
                            tbt_price={this.state.tbt_price}
                            refid={this.state.refid}
                            six_percent={this.state.six_percent}
                            fifteen_percent={this.state.fifteen_percent}
                            deposit_amount={this.state.deposit_amount}
                            user_status={this.state.user_status}
                            tbt_min_deposit={this.state.tbt_min_deposit}

                        /> :
                        null}

                    <SmartInfo
                        smartLoading={this.state.smartLoading}
                        totalInvested={this.state.totalInvested}
                        contractBalance={this.state.contractBalance}
                        subContract={this.state.subContract}
                        subtbt={this.state.subtbt}
                        totalUsers={this.state.totalUsers}
                        contract_status={this.state.contract_status}
                        HCB={this.state.HCB}
                        LowerHCB={this.state.LowerHCB}
                        HigherHCB={this.state.HigherHCB}
                        totalPaid={this.state.totalPaid}
                        total_tbt_sent={this.state.total_tbt_sent}
                        contract_tbt_bal={this.state.contract_tbt_bal}
                    />

                    {this.state.userTotalDeposit > 0 ?
                        <div>
                            <PersonalStats

                                daily_roi={this.state.daily_roi}
                                user_status={this.state.user_status}
                                account={this.state.account}
                                subAccount={this.state.subAccount}
                                upline={this.state.upline}
                                subUpline={this.state.subUpline}
                                userTotalDeposit={this.state.userTotalDeposit}
                                payout_time={this.state.payout_time}
                                hours={this.state.draw_hrs}
                                mins={this.state.draw_mins}
                                secs={this.state.draw_secs}
                                deposit_amount={this.state.deposit_amount}
                                total_structure={this.state.total_structure}
                                direct_bonus={this.state.direct_bonus}

                            />

                            <TBTstats

                                from_deposit={this.state.from_deposit}
                                from_withdrawal={this.state.from_withdrawal}
                                tbt_bal={this.state.tbt_bal}
                                total_tbt={this.state.total_tbt}
                            />

                            <LevelStats

                                temp_directs_count={this.state.temp_directs_count}
                                level1={this.state.level1}
                                level2={this.state.level2}
                                level3={this.state.level3}
                            />

                            <IncomeandTeamStats
                                userTotalDeposit={this.state.userTotalDeposit}
                                userTotalWithdrawn={this.state.userTotalWithdrawn}
                                referrals_count={this.state.referrals_count}
                                deposit_amount={this.state.deposit_amount}
                                total_structure={this.state.total_structure}
                            />

                            <ReferralLink
                                account={this.state.account}
                            />
                        </div> : null}


                    <div style={{ paddingBottom: "20px" }}></div>

                    <div style={{ paddingBottom: "50px" }}></div>
                </div>

            </div >
        );
    }
}
export default TopPage;