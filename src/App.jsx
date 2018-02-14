import React, {Component} from 'react';
import {observer} from 'mobx-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainComponent from './components/MainComponent';
import AlertContainer from 'react-alert';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import ProgressOverlay from './components/common/ProgressOverlay';
injectTapEventPlugin();

let wsurl = 'ws://46.250.220.119:9000/ws';
let ws;

@observer
class App extends Component {

    constructor(args)
    {
        super(args);
        this.initWebsocketConnection = this.initWebsocketConnection.bind(this);
        this.websocketRequest = this.websocketRequest.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        ws = new WebSocket (wsurl);
    }

    websocketRequest = function(params)
    {
        this.props.appStore.loading = true;
        ws.send(JSON.stringify(params));        
    };

    showAlert = (text,type) => {
        msg.show(text, {
            time: 5000,
            type: type,
        });  
    };

    initWebsocketConnection = function()
    {
        let self = this;

        ws.onmessage = function(response) {

            let data = JSON.parse(response.data);
            console.log('WS: ', data);
            if(data.cellResponseData) self.props.appStore.data = data.cellResponseData;
            if(data.appUserList) self.props.appStore.userList = data.appUserList;
            self.props.appStore.loading = false;
        };

        ws.onerror = function(err){
            console.error('WEBSOCKET ERROR',err);
        };

        ws.onopen = function(message){
            console.log('Subscribing...');
            self.showAlert('Koblet til server.','success');
            self.props.appStore.loading = false;
            let openCommand = {
                command:'SUBSCRIBE',
                params:{
                    username:'joakim',
                    webUser:true
                }
            };
            ws.send(JSON.stringify(openCommand));
        };

        ws.onclose = function(message){
            console.log('WEBSOCKET LUKKET',message);
            self.showAlert('Koblet fra server, prøver å gjenopprette...','error');
            setTimeout(function(){
                ws = new WebSocket(wsurl);
                if(ws) self.initWebsocketConnection();
                else self.showAlert('Koblet fra server, prøver å gjenopprette...','error');
            }, 5000);
        };
    }

    updateDimensions(){
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        this.props.appStore.windowHeight = g.clientHeight;
    };

    componentDidMount() {
        this.props.appStore.data = [];
        this.props.appStore.userList = [];
        this.props.appStore.loading = true;
        this.initWebsocketConnection();
    }

    render() {
        return (
          <div>
              <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />              
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <div>
                    <MainComponent request={this.websocketRequest} appStore={this.props.appStore}/>
                    <ProgressOverlay loading={this.props.appStore.loading} />
                 </div>                 
              </MuiThemeProvider>
              {/*<DevTools/>*/}
          </div>
        );
  }
}

export default App;
