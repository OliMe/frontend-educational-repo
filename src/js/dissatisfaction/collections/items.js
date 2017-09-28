
import Backbone from 'backbone';

import LocalStorage from 'backbone.localstorage';

import $ from "jquery";
import underscore from "underscore";

import FormModel from '../models/form';
import FormView from "../views/form";



var ListCollection = Backbone.Collection.extend({

    model: FormModel,
    localStorage: new LocalStorage('ListCollection'),

    initialize: function() {
        // загрузить список из хранилища
        this.fetch({ajaxSync: false});
        
    },

});

export default ListCollection;