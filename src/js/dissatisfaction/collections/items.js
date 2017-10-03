import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import FormModel from '../models/form';

/**
 * Коллекция товаров для отображения списка
 */
var ListCollection = Backbone.Collection.extend({
    model: FormModel,
    localStorage: new LocalStorage('ListCollection'),
    initialize: function() {
        // загрузить список из хранилища
        this.fetch({ajaxSync: false});
    },
});
export default ListCollection;