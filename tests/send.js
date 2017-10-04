/**
 * Проверяет форму отправления претензии
 */
import ListView from "./../src/js/dissatisfaction/views/list";
import FormModel from "../src/js/dissatisfaction/models/form";
/**
 * Создает новую форму (правое меню должно отсутствовать в начале)
 */
describe('Проверка SendView', function() {
    var list;
    beforeEach( function() {
        localStorage.clear();
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html');
        list = new ListView();
    });

    it( 'Форма не должна отобразиться', function() {
        expect( list.sendForm.$el.find('.menu-rght-col').length ).toBe(0);
    });

    it( 'Проверка активации кнопки отправления формы после добавления товара', function() {
        list.collection.add( new FormModel() );
        expect( list.sendForm.$el.find('.btn-send').length ).toBe(1);
    });

    it( 'Проверка кол-ва товаров в правой форме', function() {
        list.collection.add( new FormModel() );
        list.collection.add( new FormModel() );
        list.sendForm.render();
        expect( list.sendForm.$el.find('#summ_items').html() ).toBe("2");
    })
})


