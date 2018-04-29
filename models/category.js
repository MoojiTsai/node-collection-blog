const Category = require('../lib/mongo').CategoryModel

module.exports = {
    // 注册一个用户
    createCategory: function (name) {
        let data = new Category(name);
        data.save(function (err, result) {
            if (err) console.error(err);

            return err;
        });
        return Category;
    },
    getCategories: function () {
        return Category.find({});
    },
    deleteCategory: function (id) {
        return Category.findByIdAndRemove({ _id: id }, function (err, data) {

        });
    }


}
