import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import GoogleMapPlace from '../components/common/GoogleMapPlace';
import GoogleMap from '../components/common/GoogleMap';
import PlaceIcon from 'material-ui/svg-icons/communication/location-on';

@observer
export default class MapComponent extends Component{

    constructor(args){
        super(args);

        this.state = {
            map:null,
            maps:null,
            mapLoaded:null
        }
    }

    @computed
    get googleMap(){
        if(this.props.appStore.data)
        {
                return this.props.appStore.data.latitude && this.props.appStore.data.longitude &&
                    <GoogleMap   
                        apiKey={this.props.appStore.googleApiKey}
                        center={[this.props.appStore.data.latitude,this.props.appStore.data.longitude]}
                        markers={[
                            <GoogleMapPlace
                                key={0}
                                lat={this.props.appStore.data.latitude}
                                lng={this.props.appStore.data.longitude}
                                text={'Lokasjon'}
                                icon={<PlaceIcon color={'blue'} size={'1.5em'}/>}/>,
                        ]}
                    />
        }
    }

    render(){
        return(
            <div>
                {this.googleMap}
            </div>
        )
    }
}
