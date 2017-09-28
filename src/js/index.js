/**
 * Created by root on 20.09.17.
 */

import '../scss/forms.scss';
import '../scss/icons.scss';
import '../scss/links_buttons.scss';
import '../scss/main.scss';
import '../scss/tooltips.scss';

import _ from 'lodash';
import Backbone from "backbone";
import $ from "jquery";

import FormModel from './dissatisfaction/models/form';

import ListView from "./dissatisfaction/views/list";
import FormView from './dissatisfaction/views/form';

import ListCollection from "./dissatisfaction/collections/items";

init();

function init() {

    var collection = new ListCollection();
    var listView = new ListView( collection );
}


