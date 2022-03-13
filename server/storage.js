const storage = new function () {

    let dataContainer = {};

    this.set = function (name, value) {
        dataContainer[name] = value;
    };

    this.getStorage = function (name) {
        return dataContainer[name];
    };

    this.getAll = function () {
        return dataContainer;
    };

    this.remove = function (name) {
        if (typeof (dataContainer[name]) !== undefined) {
            delete dataContainer[name];
        }
    };

    this.removeAll = function () {
        dataContainer = {};
    };
};

module.exports = storage;
