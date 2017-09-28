/**
 * Created by pasha on 25.09.17.
 */
import _ from 'lodash';
import Backbone from "backbone";
import $ from "jquery";

import FormModel from '../models/form';

import Cause from './cause';
import FormView from "../views/form";
import SendFormView from "../views/send";


var ListView = Backbone.View.extend({

    el: $('.dissatisfaction-list'),

    initialize: function (collection) {

        this.collection = collection;
        this.listenTo(this.collection, "add", this.showBtnForm );

        this.render();

        // создать форму отправления
        this.sendForm = new SendFormView(collection);

        if( collection.length <= 0 )
            this.addNewForm();
    },

    isAddingForm: true,


    template: _.template($('#template_item').html(), {}),
    templateBtn: _.template($('#btn_add_template').html()),
    templateIconComment: _.template($('#template_icom_comment')),
    templateIconPhoto: _.template($('#template_icom_photo')),


    events: {
        'mousedown .btn-add-item': "addNewForm",   // кнопка создания новой формы
    },

    render: function () {
        var that = this;

        this.$el.html(this.template({
            collection: this.collection
        }));

        this.$el.append( this.templateBtn({ isShowBtn:this.isAddingForm }) );
    },

    remove: function () {
        this.$el.empty();
    },

    showBtnForm: function () {
        this.sendForm.enableSendBtn();
        this.isAddingForm = true;
        this.render();
    },

    hideBtnForm: function() {
        this.sendForm.disableSendBtn();
        this.isAddingForm = false;
        this.render();
    },

    addNewItem: function (model) {
        this.collection.add(model);
        model.save();
        this.render();
    },

    addNewForm: function () {

        // спрятать кнопку
        this.hideBtnForm();

        // отображение формы добавления товара при загрузке страницы
        var item = new FormView(this.collection, this);
        item.render();

        // показать кнопку, если отменили форму
        this.listenTo(item, 'canceled', this.showBtnForm );
    }


});

export default ListView;