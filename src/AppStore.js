import {observable} from 'mobx';
import React from 'react';

export default class AppStore {

    @observable data = [];
    @observable userList = [];
    @observable loading = false;
    @observable appHeight = 1000;
    specialChars = /^[æøåÆØÅa-zA-Z0-9,._ ]*$/g;
    numberChars = /^[0-9]*$/g;

    googleApiKey = 'AIzaSyCWdpyEzy2RkKuyEwFffc6nsZWGRxEQ-bc';
}