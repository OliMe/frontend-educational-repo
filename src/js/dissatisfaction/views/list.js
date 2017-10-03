import _ from 'lodash';
import Backbone from "backbone";
import $ from "jquery";
import FormView from "../views/form";
import SendFormView from "../views/send";
import ListCollection from "../collections/items";

/**
 * Отображение списка добавленных товаров через форму претензии
 */
var ListView = Backbone.View.extend({
    el: '.dissatisfaction-list',
    /**
     * Создает коллекцию товаров и форму добавления нового товара
     */
    initialize: function () {
        this.addTemplates();
        this.collection = new ListCollection();
        this.listenTo(this.collection, "add", this.showBtnForm );
        this.render();
        // создать форму отправления
        this.sendForm = new SendFormView(this.collection);
        // если коллекция еще не содержит товары, отобразить форму заполнения
        if( this.collection.length <= 0 )
            this.addNewForm();

    },
    events: {
        'mousedown .btn-add-item': "addNewForm",   // кнопка создания новой формы
    },

    // флаг, что форма отображена
    isShowForm: true,
    template: "",
    templateBtn: "",
    templateIconComment: "",
    templateIconPhoto: "",

    addTemplates: function() {
        this.template = _.template( $('#template_item').html(), {});
        this.templateBtn =   _.template($('#btn_add_template').html());
        this.templateIconComment = _.template($('#template_icom_comment'));
        this.templateIconPhoto =  _.template($('#template_icom_photo'));
    },

    /**
     * Отображает коллекцию товаров, добавляет в конец кнопку создания новой формы
     * добавления товара
     */
    render: function () {
        this.$el.html(this.template({
            collection: this.collection
        }));
        this.$el.append( this.templateBtn({ isShowBtn:this.isShowForm }) );
    },
    /**
     * Удаляет отображение всех элементов и кнопку добавления новой претензии
     */
    remove: function () {
        this.$el.empty();
    },
    /**
     * Показать кнопку создания формы, активировать кнопку отправления претензии
     */
    showBtnForm: function () {
        this.sendForm.enableSendBtn();
        this.isShowForm = true;
        this.render();
    },
    /**
     * Спрятать кнопку создания формы, деактивировать кнопку отправления претензии
     */
    hideBtnForm: function() {
        this.sendForm.disableSendBtn();
        this.isShowForm = false;
        this.render();
    },
    /**
     * Создать новый товар
     * @param model заполненная форма
     */
    addNewItem: function (model) {
        this.collection.add(model);
        model.save();
        this.render();
    },
    /**
     * Создает новую форму для добавления товара
     */
    addNewForm: function () {
        // спрятать кнопку
        this.hideBtnForm();
        // отображение формы добавления товара при загрузке страницы
        this.form = new FormView(this.collection, this);
        this.form.render();
        // показать кнопку, если отменили форму
        this.listenTo(this.form, 'canceled', this.showBtnForm );
    }
});
export default ListView;