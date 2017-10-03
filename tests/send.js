/**
 * Проверяет форму отправления претензии
 */
import ListView from "./../src/js/dissatisfaction/views/list";
import FormModel from "../src/js/dissatisfaction/models/form";
/**
 * Создает новую форму (правое меню должно отсутствовать
 */
describe('Проверка отсутствия правого меню при первичном отображении', function() {
    var list;
    beforeEach( function() {
        localStorage.clear();
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html');
        list = new ListView();
    });
    it( 'Форма не должна отобразиться', function() {
        expect( list.sendForm.$el.find('.menu-rght-col').length ).toBe(0);
    })
})
/**
 * Создает меню и проверяет работу кнопки отправки товара
 */
describe('Проверка работы правого меню после добавления товаров', function() {
    var list;
    /**
     * Создать лист отображения товаров.
     * добавить 2 товара, чтобы проверить счетчик кол-ва товаров
     */
    beforeEach( function()  {
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html');
        localStorage.clear();
        list = new ListView();
        list.collection.add( new FormModel() );
        list.collection.add( new FormModel() );
        list.sendForm.render();
    });
    it( 'Прверка активации кнопки отправления формы после добавления товара', function() {
        expect( list.sendForm.$el.find('.btn-send').length ).toBe(1);
    })
    it( 'Проверка кол-ва товаров в правой форме', function() {
        expect( list.sendForm.$el.find('#summ_items').html() ).toBe("2");
    })
});

