/**
 * Created by pasha on 25.09.17.
 *
 папка templates/form/causes - содержит набор темплейтов для вывода различных элементов формы.
 Например: форма кол-ва брака или недокомплекта и .т.д.

 В зависимости от этого подставляется один из view, где название view соответствует названию ттемплейта и соответствует перменной type-cause в модели

 */
import Backbone from "backbone";
import $ from "jquery";


var Cause = Backbone.View.extend({

    initialize: function ( model ) {
        this.listenTo(this.model, 'change:type_cause', this.changeCause );
    },

    render: function () {
        
        // темплейт id = type_cause в модели, по этому подставляем его
        var currentTamplate = $('#template_' + this.model.get( 'type_cause' ) );

        var template = _.template(currentTamplate.html(), {});
        this.$el.html(template);

        var num = this.model.get( 'num1' );
        $('.input-num-1').val( num );

        var num2 = this.model.get( 'num2' );
        $('.input-num-2').val( num2 );
    },

    events: {
        "mousedown .btn-minus-summ-1"         :   "minusItem",                 // увеличить кол-во брака
        "mousedown .btn-plus-summ-1"          :   "plusItem",                // слушать и менять в модели все input
        "mousedown .btn-minus-summ-2"         :   "minusItem2",                 // увеличить кол-во брака
        "mousedown .btn-plus-summ-2"          :   "plusItem2"                // слушать и менять в модели все input
    },

    plusItem: function() {
        this.model.plusCauseItemNum1();
        $('.input-num-1').val(this.model.get('num1') );
    },

    minusItem: function() {
        this.model.minusCauseItemNum1();
        $('.input-num-1').val( this.model.get('num1') );
    },

    plusItem2: function() {
        this.model.plusCauseItemNum2();
        $('.input-num-2').val(this.model.get('num2') );
    },

    minusItem2: function() {
        this.model.minusCauseItemNum2();
        $('.input-num-2').val( this.model.get('num2') );
    },

    changeCause: function() {
        this.undelegateEvents();
    }

});

export default Cause;

