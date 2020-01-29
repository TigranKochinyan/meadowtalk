suite('тести страицы "О" ', function () {
    test('страница должна содержать ссилку на страницу контактов', function () {
        assert($('a[href="/contact"]').length);
    })
})