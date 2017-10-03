/**
 * Created by pasha on 25.09.17.
 */
import Backbone from "backbone";
import $ from "jquery";
import Cause from './cause';
import FormModel from '../models/form';
import PhotoCollection from '../collections/photos';

/**
 * Форма заполнения претензии
 */
var FormView = Backbone.View.extend({
    el: $('#form_add'),
    /**
     * Создает коллекции листа отображения добавленнх товаров,
     * коллекции загруженных фотографий и модель формы
     * @param ListCollection collection коллекция уже добавленных товаров
     */
    initialize: function ( collection ) {
        this.collection = collection;
        this.photoCollection = new PhotoCollection();
        this.listenTo( this.photoCollection, 'add', this.onPhotoAdded );
        this.model = new FormModel();
        // сгенерировать случайные параметры модели
        this.model.getRandomParams();
        // форма выбора количества товара в претензии
        this.cause = new Cause( { model: this.model } );
    },
    events: {
        'change #file-upload':"addFiles", // слушать изменения поля input files
        "change input":"changed", // слушать и менять в модели все input
        "change textarea":"changed",// слушать и менять в модели comment
        "mousedown .btn-diss":"setTypeDissatisfaction", //  кнопка причина недовольства
        "click .btn-add-dissatisfaction":"addNewItem",// кнопка добавить претензию
        "click .btn-cancel-dissatisfaction":"cancelAdd",// кнопка отменить
        "click .dissatisfaction-close-icon":"cancelAdd" , //  кнопка закрыть (справа сверху)
        'click .close-item':"closeItem"//  кнопка закрыть (справа сверху)

    },
    template: _.template( $('#form_template').html() ),
    /**
     * Выводит форму, передает коллекцию фотографий, добавленных пользователем
     */
    render: function () {
        this.$el.html(this.template({ collection:this.photoCollection.toJSON() }));
    },
    /**
     * Удаляет слушатели, очищает элемент
     */
    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
    },
    /**
     * Кликнули input file, добавление локальной фотграфии в форму
     * @param ev событие
     */
    addFiles: function(ev) {
        var that = this;
        if (ev.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // если фото больше 1мб, выводим сообщение
                if( e.total < 1000000 ) {
                    // id - ид генерируется из рандома
                    // добавляем новое фото в коллекцию
                    that.photoCollection.add({ id:Math.random()*10000, data: e.target.result, size: e.total });
                    that.render();
                }
                else {
                    alert("Размер не должен превышать 1мб");
                }
            }
        }
        reader.readAsDataURL(ev.target.files[0]);
    },
    /**
     * События на любые изменения в заполнении
     * текстовых полей формы и запись в модель
     * @param evt
     */
    changed:function (evt) {
        var changed = evt.currentTarget;
        var value = $(evt.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;
        this.model.set(obj);
    },
    /**
     * Событие клика по любой из кнопок причины недовольства
     * @param ev
     */
    setTypeDissatisfaction:function(ev) {
        // если кликнули еще раз, возвращаемся
        if( $(ev.currentTarget).attr( 'id' ) == this.model.get('type_cause') )
            return;
        // Подсветить кнопку выбора причины недовольства
        $('.btn-diss').removeClass('btn-diss-active');
        $(ev.currentTarget).addClass('btn-diss-active');
        // изменить модель
        this.model.changeCauseTypeAndName($(ev.currentTarget).attr( 'id' ), $(ev.currentTarget).text());
        // рендерить новую форму для ввода
        this.cause.setElement( this.$el.find('.form-set-num'));
        this.cause.render();
    },
    /**
     * Событие из коллекции, добавление фото в форму
     * записать данные в модель формы
     * @param ev
     */
    onPhotoAdded:function( ev ) {
        this.model.set('photos', this.photoCollection.toJSON());
    },
    /**
     * Событие создания формы, проверка валидации
     * @param ev
     */
    addNewItem:function ( ev ) {
        var validation = this.model.validateForm();
        if( validation == true ) {
            this.model.save();
            this.collection.add( this.model );
            this.remove();
        }
        else
        {
            // вывести сообщение если валидация не пройдена
            alert(validation);
        }
    },
    /**
     * Отменили создание формы
     * @param ev событие клика на крастик формы или кнопку "отменить"
     */
    cancelAdd: function(ev) {
       this.trigger("canceled");
       this.remove();
    },
    /**
     * Удалить добавленное фото в форму
     * @param ev событие клика на иконку
     */
    closeItem: function ( ev ) {
        var photo = this.photoCollection.get( $(ev.target).attr('id') );
        this.photoCollection.remove( photo );
        this.$el.find( '#id' + photo.get('id') ).remove();
        this.render();
    }
});
export default FormView;