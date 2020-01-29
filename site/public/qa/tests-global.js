suite('Global Tsets', function () {
    test('У данной страицы допустимый загаовок', function () {
        assert(document.title && document.title.match(/\S/)) &&
            document.title.toUpperCase() != 'TODO';
    });
});