import Backbone from "backbone";
import $ from "jquery";
import UtiliteInput from './utilite_input';

/**
 * Отображение и изменение количества неудовлетворивших товаров
 */
var Cause = Backbone.View.extend({
    /**
     * Создать утилиту для прослушивания нажатия кнопок на счетчиках + и -
     */
    initialize: function () {
        this.utiliteInput = new UtiliteInput();
        this.listenTo(this.utiliteInput, 'change', this.onChangetAmountCause);
    },
    /**
     * Отобразить счетчик(и) кол-ва неудовлетворивших товаров
     * отображает форму кол-ва неудовлетворивших товаров в зависимости
     * от нажатой кнопки в FormView
     */
    render: function () {
        // темплейт id = type_cause в модели, по этому подставляем его
        var currentTamplate = $('#template_' + this.model.get('type_cause'));
        var template = _.template(currentTamplate.html(), {});
        this.$el.html(template);
        this.utiliteInput.setElement(this.$el);
    },
    /**
     * Изменили параметр неудовлетворившего товара,
     * проверяем тип изменяемого товара, у недовложения 2 типа переменных
     * causeAmountNonImposion и causeAmount
     * @param val параметр инпута, который приходит от UtiliteInput
     */
    onChangetAmountCause: function (val) {
        // проверяем, если кликнули "недовложение"
        if (val.hasClass('non-imposion')) {
            console.log("change imposion");
            this.model.set('causeAmountNonImposion', val.val());
        }
        else {
            console.log("change another");
            // изменяем кол-во остальны прчин недовольства
            this.model.set('causeAmount', val.val());
        }
    },
});
export default Cause;

