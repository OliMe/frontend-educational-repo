/**
 * Created by pasha on 25.09.17.
 *
 папка templates/form/causes - содержит набор темплейтов для вывода различных элементов формы.
 Например: форма кол-ва брака или недокомплекта и .т.д.

 В зависимости от этого подставляется один из view, где название view соответствует названию ттемплейта и соответствует перменной type-cause в модели

 */
import Backbone from "backbone";
import $ from "jquery";


var SendFormView = Backbone.View.extend({

    el:$('#container_send_form'),

    initialize: function ( collection ) {
        this.collection = collection;
        this.collection.bind('add', this.changeSumm, this );
        this.render();
    },

    template: _.template( $('#template_send_form').html(), {} ),

    // кнопка включена
    isEnableSendButton:true,

    events: {
        'mousedown #send_form_enabled': "sendForm",   // кнопка создания новой формы
    },

    render: function () {
        this.$el.html( this.template( {summ: this.collection.length, is_enable_send:this.isEnableSendButton } ) );
    },

    changeSumm:function() {
        this.render();
    },

    enableSendBtn: function() {
      this.isEnableSendButton = true;
        this.render();
    },

    disableSendBtn:function() {
      this.isEnableSendButton = false;
        this.render();
    },

    sendForm: function() {

        //TODO:: переделать в нотификацию
        alert('Форма отправлена');
    }

});

export default SendFormView;

