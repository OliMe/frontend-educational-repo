/**
 * Проверяет лист отображения товаров
 */
import ListView from "./../src/js/dissatisfaction/views/list";
import FormModel from "./../src/js/dissatisfaction/models/form";

describe( 'Проверка создания пустого списка товаров', function() {
    beforeAll(function () {
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html')
    });
    var list;
    // Создать пустой список отображения
    beforeEach( function() {
        // Очистить
        localStorage.clear();
        // Новый лист
        list = new ListView();
    });
    it( "Проверить создание пустого списка товаров", function() {
        expect(list.$el.html()).not.toHaveClass('item-basket');
    })
});
describe( 'Проверка добавления нового товара в лист', function() {
    var list;
    var newItem;
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';
        loadFixtures('template.html');

        // Новый лист
        list = new ListView();
        newItem = new FormModel();
        // передаем тестовые значения
        newItem.changeCauseTypeAndName('non-inposition', 'Недовложение');
        newItem.getRandomParams();
        // Создать новый товар
        list.addNewItem(newItem);
    });
    it("Проверить отображение товара после добавления", function () {
        expect(list.$el.html()).toHaveClass('item-basket');
        expect(list.$el.html()).toHaveClass('btn-add-item');
        // Проверка на содержание основных элементов
        expect(list.$el.find('.link-name-item').length).not.toBe(0);
        expect(list.$el.find('.num-invoice').length).not.toBe(0);
        expect(list.$el.find('.num-article').length).not.toBe(0);
        expect(list.$el.find('.order-recieved').length).not.toBe(0);
        expect(list.$el.find('.item-img').length).not.toBe(0);
    })
});


