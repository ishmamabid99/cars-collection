'use strict;'
var crypto = require('crypto');

module.exports = function () {
    return {
        carsList: [],
        /*
         * Save the movie inside the "db".
         */
        save(car) {
            car.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.carsList.push(car);
            return 1;
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find(id) {
            if (id) {
                return this.carsList.find(element => {
                    return element.id === id;
                });
            } else {
                return this.carsList;
            }
        },
        /*
         * Delete a movie with the given id.
         */
        remove(id) {
            var found = 0;
            this.carsList = this.carsList.filter(element => {
                if (element.id === id) {
                    found = 1;
                } else {
                    return element.id !== id;
                }
            });
            return found;
        },
        /*
         * Update a movie with the given id
         */
        update(id, car) {
            var carIndex = this.carsList.findIndex(element => {
                return element.id === id;
            });
            if (carIndex !== -1) {
                this.carsList[carIndex].model = car.model;
                this.carsList[carIndex].owner = car.owner;
                return 1;
            } else {
                return 0;
            }
        }
    }
};