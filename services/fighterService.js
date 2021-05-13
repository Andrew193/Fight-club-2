const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getFighters(){
        return FighterRepository.getAll();
    }
    createFighter(data){
        return FighterRepository.create(data)
    }
    getFighter(id){
        return FighterRepository.getOne(id)
    }
    deleteFighter(id){
        return FighterRepository.delete(id)
    }
    update(id,upload){
        return FighterRepository.update(id,upload)
    }
    search(name){
        return FighterRepository.searchByName(name)
    }
}

module.exports = new FighterService();