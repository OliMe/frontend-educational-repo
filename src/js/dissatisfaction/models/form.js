import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';

/**
 * Модель формы заполнения претензии
 */
var FormModel = Backbone.Model.extend({
    localStorage: new LocalStorage('ListCollection'),
    defaults: {
        name_cause: "",                   // название претензии (рус текст)
        enter_cause: "",                  // вывод претензии в листе (рус текст)
        type_cause: "",                   // тип претензии
        name: "Товар",                    // название товара
        invoice: "",                      // номер накладной
        article: "",                      // номер артикла
        img: "/src/img/items_140/1.png",  // картинка товара(base:64)
        photos: "",                       // фоторграфии товара
        comment: "",                      // комментарий к товару
        causeAmount: 0,                   // Количество неудовлетворивших товаров ( брак, недовложение, недокомплект и т.д. )
        causeAmountNonImposion: 0,        // Количество полученных товаров ( при недовложении )
    },
    /**
     * Генерирует рандомные параметры для локального теста
     */
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
    /**
     * Валидация вводимых значений
     * @returns boolean|string возвращает текс ошибки валидации или true если все ок
     */
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
        return true;
    },
    /**
     * Передает тип претензии и название
     * @param type тип претензии
     * @param name название претензии
     */
    changeCauseTypeAndName: function( type, name ) {
        // изменить тип претензии
        this.set('type_cause', type);
        // изменить имя претензии
        this.set('name_cause', name );
    },
    /**
     * Существует ли комментарий
     * @returns {boolean} возвращает true если существует
     */
    hasComment: function () {
        return this.get('comment').length > 0;
    },
    /**
     * Существует ли фото
     * @returns {boolean} возвращает true если существует
     */
    hasPhoto: function () {
        return this.get('photos').length > 0;
    }
});
export default FormModel;
