var config = require('./config.js');

AY = require('aboutyou-sdk')(config.AY.appId, config.AY.secret);

var AboutYou = {};

AboutYou.fetchProducts = function(categoryId, limit, productFields) {
    var args = [].slice.call(arguments);
    var callback = typeof args[args.length - 1] === 'function' && args.pop();

    // Search options
    categoryId = categoryId && (typeof categoryId !== 'function') ? categoryId :  93924;
    limit = limit && (typeof limit !== 'function') ? limit :  100;
    productFields = productFields && (typeof productFields !== 'function') ? productFields : ["id", "name", "default_image"];

    // Create search criteria
    var criteria = AY.getProductSearchCriteria('GENERATE_OWN_SESSION');
    criteria.filterByCategoryIds(categoryId);
    criteria.selectProductFields(productFields);
    criteria.setLimit(limit);

    // Execute search
    AY.fetchProductSearch(criteria, function(err, searchResult) {
        if (err) {
            callback(err, null);
        } else {
            var products = searchResult ? searchResult.toJSON() : [];
            callback(null, formatProducts(products));
        }
    });
};

var formatProducts = function(products) {
    var results = [];
    for (var i = 0; i < products.length; i++) {
        results.push({
            "id": products[i].id,
            "name": products[i].name,
            "image_url": products[i].defaultImage.url
        });
    };
    return results;
};

module.exports = AboutYou;
