const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    // OPTIONAL TODO: Implement methods to work with fights
    createFight(data){
        return FightRepository.create(data)
    }
    delete(id){
        return FightRepository.delete(id)
    }
    getAll(){
        return FightRepository.getAll()
    }
}

module.exports = new FightersService();