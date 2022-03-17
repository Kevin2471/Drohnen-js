const storage = new function () {

        let dataContainer = [];

        this.set = function (value) {
            dataContainer.unshift(value);
            console.log(dataContainer);
        };

        this.checkUser = function (name) {
            return dataContainer.includes(name);
        };

        this.getAll = function () {
            return dataContainer;
        };

        this.remove = function (name) {
            const pos = dataContainer.indexOf(name);
            dataContainer.splice(pos);
            console.log(dataContainer);

        };

        this.removeAll = function () {
            dataContainer = {};
        };
    }
;

module.exports = storage;
