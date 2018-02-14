import {observer} from 'mobx-react';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Moment from 'react-moment';

@observer
export default class LeftComponent extends Component{
    
    constructor(args) {
        super(args);
        this.state = {
            user: null,
        };
    }

    handleFindUser = () => {

        if(!this.state.user) return;
        let command = {
            command:'REQUEST_DATA',
            params:{
                username:'joakim',
                autoupdate:0,
                cellusername:this.state.user
            }
        };

        this.props.request(command);
    };

    handleChange = (u,p) => {
        this.setState({user:this.props.appStore.userList[p]});
    };

    render(){

        return (
            <div>
                <div style={{width:'100%',textAlign:'center',backgroundColor:'#da9129',color:'white',padding:'10px'}}>
                    CHOOSE USER
                </div>
                <div style={{textAlign:'center'}}>
                    <DropDownMenu
                        value={this.state.user}
                        onChange={this.handleChange}
                        style={{width:'100%'}}
                        menuItemStyle={{width:'75%'}}
                    >
                        {
                            this.props.appStore.userList.map((user,index)=>
                                <MenuItem style={{width:'200px',textAlign:'center'}} value={user} primaryText={user} key={index} />
                            )
                        }
                    </DropDownMenu>
                </div>
                <div style={{marginTop:'40px',textAlign:'center'}}>
                    <RaisedButton onClick={this.handleFindUser} buttonStyle={{backgroundColor:'#da9129'}} style={{width:'100%'}} label={'FIND'} />
                </div>
                <div style={{display:'flex',paddingLeft:'10px',marginTop:'40px',textAlign:'center'}}>
                    <div style={{width:'33%'}}>
                        <div style={{textAlign:'left',color:'#da9129'}}>{'Time'}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{'Long'}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{'Lat'}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{'Batt'}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{'Network'}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{'Status'}</div>
                    </div>
                    <div style={{width:'66%'}}>
                        <div style={{textAlign:'left',color:'#da9129'}}>{this.props.appStore.data.dateTime && <Moment format="DD.MM.YYYY HH:mm:ss" date={(this.props.appStore.data.dateTime)}/>}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{this.props.appStore.data.longitude}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{this.props.appStore.data.latitude}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{this.props.appStore.data.battery}{this.props.appStore.data.battery && '%'}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{this.props.appStore.data.network}</div>
                        <div style={{textAlign:'left',color:'#da9129'}}>{this.props.appStore.data.status}</div>
                        </div>
                    </div>
            </div>
        );
    }
}