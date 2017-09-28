/**
 * Created by pasha on 25.09.17.
 */

import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';

var FormModel = Backbone.Model.extend({

    localStorage: new LocalStorage('ListCollection'),

    initialize: function () {
    },

    defaults: {
        name_cause: "",                                 // название претензии (рус текст)
        enter_cause: "",                                // вывод претензии в листе (рус текст)
        type_cause: "",                                 // тип претензии
        name: "Товар",                                  // название товара
        invoice: "",                                    // номер накладной
        article: "",                                    // номер артикла
        img: "/src/img/items_140/1.png",                // картинка товара(base:64)
        photos: "",                                     // фоторграфии товара
        comment: "",                                    // комментарий к товару

        num1: 0,                                       // Количество неудовлетворивших товаров ( брак, недовложение, недокомплект и т.д. )
        num2: 0,                                       // Количество полученных товаров ( при недовложении )

        // Ид для локального сохранения
        id: _.random(0, 10000)

    },

    getRandomParams: function () {

        if (Math.random() > 0.5) {
            this.set('name', 'Мантия "Мафия", бархат, размер S (ДС 14 см, ОШ 12-34 см, ОГ 27-54 см)');
            this.set('img', '/src/img/items_140/1.png');
        }
        else {
            this.set('name', 'Кувшин "Пена" 1л.');
            this.set('img', '/src/img/items_140/2.png');
        }


    },

    validateForm: function () {

        if (this.get('type_cause') == "") {
            return "Вы не выбрали причину недовольства";
        }

        if (this.get('invoice').length <= 0) {
            return "Вы не ввели номер накладной";
        }

        var isnumInvoice = /^\d+$/.test(this.get('invoice'));

        if (!isnumInvoice) {
            return "Номер накладной должен быть числом";
        }

        if (this.get('article').length <= 0) {
            return "Вы не ввели номер артикула";
        }

        var isnumArticle = /^\d+$/.test(this.get('article'));

        if (!isnumArticle) {
            return "Артикул должен быть числом";
        }

        if (this.get('num1') <= 0) {
            return "Введите количество неудовлетворивших товаров";
        }

        if( this.get('type_cause') == "non-inposition" )
        {
            if( this.get('num1') > this.get('num2') )
            {
                return "";
            }
        }

        return true;

    },

    changeCause: function( obj ) {
        // изменить тип претензии
        this.set('type_cause', obj.type_cause);
        // изменить имя претензии
        this.set('name_cause', obj.name_cause );
    },

    plusCauseItemNum1: function () {
        this.set('num1', this.get('num1') + 1);
    },

    minusCauseItemNum1: function () {
        if (this.get('num1') <= 0)
            return;

        this.set('num1', this.get('num1') - 1);
    },

    plusCauseItemNum2: function () {
        this.set('num2', this.get('num2') + 1);
    },

    minusCauseItemNum2: function () {
        if (this.get('num2') <= 0)
            return;

        this.set('num2', this.get('num2') - 1);
    },

    isCommentIcon: function () {
        if (this.get('comment').length > 0) {
            return true;
        }
        return false;
    },

    isPhotoIcon: function () {
        if (this.get('photos').length > 0) {
            return true;
        }
        return false;
    }

});

export default FormModel;
