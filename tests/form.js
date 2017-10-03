/**
 * Проверяет форму добавленичя новой претензии
 * и список ее отображения
 */
import FormView from "./../src/js/dissatisfaction/views/form";
import ListView from "./../src/js/dissatisfaction/views/list";
import Collection from "./../src/js/dissatisfaction/collections/items";
/**
 * Создает пустую форму и проверяет ее отображение
 */
describe('Проверка отображения формы', function() {
    beforeAll(function () {
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html')
    });
    var item;
    beforeEach( function() {
        localStorage.clear();
        var collection = new Collection();
        var list = new ListView();
        item = new FormView(collection, list);
    });

    it( "Проверить отображение формы", function() {
        expect(item.$el.find('.form-back-item').length).not.toBe(0);
    });

})
/**
 * Вводит значения в форму и проверяет результат отображения в списке товаров
 */
describe('Проверка изменения значений формы', function() {
    var item;
    var list
    beforeAll( function() {
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html');
        localStorage.clear();

        list = new ListView();
        item = list.form;
        item.$el.find('#invoice').val('10000').trigger("change");
        item.$el.find('#article').val('20000').trigger("change");
        item.$el.find('.btn-diss#mirrage').trigger("mousedown");
        item.$el.find('#comment').val('Comment').trigger("change");
        //Изменения в кол-ве неудовлетворивших товаров
        item.cause.utiliteInput.$el.find('.input-amount').val(100).trigger( 'change' );
        item.$el.find('.btn-add-dissatisfaction').trigger("click");
    });
    /**
    * Если товар отобразился, значит ViewForm, ViewList и
    * FormModel работают корректно
    * Не проверяем иконку добавления картинки,
    * т.к. не тестируем программное добавление фото
    */
    it( "Проверить отображение нового товара с заданными параметрами", function() {
        expect( list.$el.html() ).toHaveClass('item-basket');
        expect( list.$el.find('.num-invoice span').html() ).toBe("10000");
        expect( list.$el.find('.num-article span').html() ).toBe("20000");
        expect( list.$el.find('.order-recieved b').html() ).toBe("100");
        expect( list.$el.find('.dissatisfaction-info p').html() ).toHaveClass("icon-comment");
    })
})

