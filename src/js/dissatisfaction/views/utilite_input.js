import Backbone from "backbone";
import $ from "jquery";

/**
 * Created by pasha on 25.09.17.
 *
 * Вспомогательный класс для обработки кнопок + и - в DOM <input class="input-amount">
 */
var UtiliteInput = Backbone.View.extend({
    /**
     * Отслеживает события нажатия на кнопки + и - и изменения поля input
     */
    events: {
        "mousedown .btn-minus": "minusVal",
        "mousedown .btn-plus": "plusVal",
        "change .input-amount": "onChange",
    },
    /**
     * Изменить val -1
     * @param ev событие клика на <span>, input получаем через родителя
     */
    minusVal: function (ev) {
        var input = $(ev.currentTarget).parent().find('.input-amount');
        var val = input.val();
        if (val > 0) {
            val = parseInt(val);
            val -= 1;
        }
        input.val(val);
        this.trigger('change', input);
    },
    /**
     * Изменить val +1
     * @param ev событие клика на <span>, input получаем через родителя
     */
    plusVal: function (ev) {

        var input = $(ev.currentTarget).parent().find('.input-amount');
        var val = input.val();
        val = parseInt(val);
        val += 1;
        input.val(val);
        this.trigger('change', input);
    },
    /**
     * Если ввели с клавиатуры значение в поле
     */
    onChange: function(ev) {
        var input = $(ev.currentTarget).parent().find('.input-amount');
        this.trigger('change', input);
    }
});

export default UtiliteInput;

