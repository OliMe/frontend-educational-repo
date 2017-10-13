import Backbone from "backbone";
import $ from "jquery";

/**
 * Форма отправления списка товаров в претензии на сервер
 */
var SendFormView = Backbone.View.extend({
    el:'#container_send_form',
    /**
     * Отображает кол-во добавленных товаров и кнопки "Отправить" и "Сохранить в черновик"
     * @param ListCollection collection коллекция со списком товаров
     */
    initialize: function ( collection ) {
        this.template = _.template( $('#template_send_form').html(), {} );
        this.collection = collection;
        this.collection.bind('add', this.changeSumm, this );
        this.render();
    },
    events: {
        'mousedown #send_form_enabled': "sendForm",   // кнопка создания новой формы
    },
    template: "",
    /**
     * Флаг активации кнопки отправления, если false
     * то открыта форма добавения товара
     */
    isEnableSendButton:true,
    render: function () {
        if( this.collection.length > 0 ){
            this.$el.html( this.template( {summ: this.collection.length, is_enable_send:this.isEnableSendButton } ) );
        }
    },
    /**
     * Событие тзменения количества товаров в списке товаров ListCollection
     */
    changeSumm:function() {
        this.render();
    },
    /**
     * Активировать кнопку отправления
     */
    enableSendBtn: function() {
      this.isEnableSendButton = true;
        this.render();
    },
    /**
     * Деактивировать кнопку отправления
     */
    disableSendBtn:function() {
      this.isEnableSendButton = false;
        this.render();
    },
    /**
     * Отправить список товаров на сервер
     * TODO сделать отправку на сервер
     */
    sendForm: function() {
        alert('Форма отправлена');
    }
});
export default SendFormView;

