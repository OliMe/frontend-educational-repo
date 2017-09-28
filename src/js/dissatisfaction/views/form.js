/**
 * Created by pasha on 25.09.17.
 */
import Backbone from "backbone";
import $ from "jquery";

import Cause from './cause';
import ListView from './list';
import FormModel from '../models/form';
import PhotoCollection from '../collections/photos';

var FormView = Backbone.View.extend({

    el: $('#form_add'),

    initialize: function ( collection ) {

        this.collection = collection;
        this.photoCollection = new PhotoCollection();

        this.listenTo( this.photoCollection, 'add', this.onPhotoAdded );

        
        this.model = new FormModel();
        this.model.getRandomParams();
        

        // форма выбора количества товара в претензии
        this.cause = new Cause( { model: this.model } );
    },

    template: _.template( $('#form_template').html() ),

    render: function () {
        console.log( this.photoCollection );
        this.$el.html(this.template({ collection:this.photoCollection.toJSON() }));
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
    },

    events: {
        'change #file-upload'                  :   "addFiles",                      // слушать изменения поля input files
        "change input"                         :   "changed",                       // слушать и менять в модели все input
        "change textarea"                      :   "changed",                       // слушать и менять в модели comment
        "mousedown .btn-diss"                      :   "setTypeDissatisfaction",   //  кнопка причина недовольства
        "click .btn-add-dissatisfaction"       :   "addNewItem",               // кнопка добавить претензию
        "click .btn-cancel-dissatisfaction"    :   "cancelAdd",                // кнопка отменить
        "click .dissatisfaction-close-icon"    :   "cancelAdd" ,                //  кнопка закрыть (справа сверху)
        'click .close-item'                     : "closeItem"                //  кнопка закрыть (справа сверху)

    },

    // событие добавления фото
    addFiles: function(ev) {

        var that = this;

        if (ev.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                if( e.total < 1000000 ) {
                    // id - ид генерируется из рандома
                    that.photoCollection.add({ id:Math.random()*10000, data: e.target.result, size: e.total });
                    that.render();
                }
                else {
                    // TODO:: отправить в менеджер нотификаций
                    alert("Размер не должен превышать 1мб");
                }
            }
        }

        reader.readAsDataURL(ev.target.files[0]);

    },



    // слушать любые изменения в форме, чтобы обновить атрибуты модели
    changed:function (evt) {
        var changed = evt.currentTarget;
        var value = $(evt.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;

        this.model.set(obj);
    },



    // кликнули по кнопке изменения причины претензии
    setTypeDissatisfaction:function(ev) {

        if( $(ev.currentTarget).attr( 'id' ) == this.model.get('type_cause') )
            return;

        // Подсветить кнопку выбора причины недовольства
        $('.btn-diss').removeClass('btn-diss-active');
        $(ev.currentTarget).addClass('btn-diss-active');

        // изменить тип претензии
        this.model.set('type_cause', $(ev.currentTarget).attr( 'id' ));
        // изменить имя претензии
        this.model.set('name_cause', $(ev.currentTarget).text());

        // рендерить новую форму для ввода
        this.cause.setElement( this.$el.find('.form-set-num'));
        this.cause.render();
    },

    // событие: добавили новое фото
    onPhotoAdded:function(ev) {
        this.model.set('photos', this.photoCollection.toJSON())
    },

    // создать новый товар
    addNewItem:function () {

        var validation = this.model.validateForm();

        if( validation == true ) {
            this.model.save();
            this.collection.add( this.model );
            this.remove();
        }
        else
        {
            // TODO:: переделать в менеджер нотификаций
            alert(validation);
        }

    },

    cancelAdd: function() {

       this.trigger("canceled");
       this.remove();
    },

    closeItem: function ( ev ) {

        var photo = this.photoCollection.get( $(ev.target).attr('name') );
        this.photoCollection.remove( photo );
        this.$el.find( '#id' + photo.get('id') ).remove();

        this.render();
    },

});

export default FormView;