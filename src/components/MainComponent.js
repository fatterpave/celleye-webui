/**
 * Created by obsjoa on 06.01.2017.
 */
import {observer} from 'mobx-react';
import React, { Component } from 'react';
import {GridList,GridTile} from 'material-ui/GridList';
import MapComponent from './MapComponent';
import LeftComponent from './LeftComponent';

@observer
export default class MainComponent extends Component{

    constructor(args) {
        super(args);
    }

    render(){

        return (
            <div>                
                <GridList cols={6} padding={4} cellHeight={this.props.appStore.appHeight}>
                    <GridTile cols={1}>
                        <div style={{height:'100%'}}>
                            <LeftComponent request={this.props.request} appStore={this.props.appStore} />
                        </div>
                    </GridTile>
                    <GridTile cols={5}>
                        <div style={{height:'100%'}}>                            
                            <MapComponent appStore={this.props.appStore}/>
                        </div>
                    </GridTile>
                </GridList>
            </div>
        );
    }
}
