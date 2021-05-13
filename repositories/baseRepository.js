const { dbAdapter } = require('../config/db');
const { v4 } = require('uuid');


class BaseRepository {
    constructor(collectionName) {
        this.dbContext = dbAdapter.get(collectionName);
        this.collectionName = collectionName;
    }

    generateId() {
        return v4();
    }

    getAll() {
        return this.dbContext.value();
    }

    getOne(parametr1, parametr2) {
        if (parametr2 && parametr1) {
            const user = (this.dbContext.find({ email: String(parametr1) }).value() || this.dbContext.find({ phoneNumber: String(parametr2) }).value())
            return user;
        } else {
            return this.dbContext.find({ id: parametr1 }).value();
        }
    }

    create(data) {
        data.id = this.generateId();
        data.createdAt = new Date();
        const list = this.dbContext.push(data).write();
        return list.find(it => it.id === data.id);
    }

    update(id, dataToUpdate) {
        dataToUpdate.updatedAt = new Date();
        return this.dbContext.find({ id }).assign(dataToUpdate).write();
    }

    delete(id) {
        return this.dbContext.remove({ id }).write();
    }

    searchByName(name){
        return this.dbContext.find(it=>it.name===name).value()
    }
    searchByPhoneNumber(phoneNumber){
        return this.dbContext.find(it=>it.phoneNumber===phoneNumber).value()
    }
    searchByEmail(email){
        return this.dbContext.find(it=>it.email===email).value()
    }
}

exports.BaseRepository = BaseRepository;