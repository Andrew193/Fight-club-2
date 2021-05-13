const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    searchS(item){
        if(!item) {
            return null;
        }
        return item;
    }
    add(userData){
        UserRepository.create(userData)
    }
    search(search) {
        const item = UserRepository.getOne(search.email,search.password);
        return this.searchS(item)
    }
    searchOne(search) {
        const item = UserRepository.getOne(search);
        return this.searchS(item)
    }
    getAll(){
        return UserRepository.getAll()
    }
    delete(id){
       return UserRepository.delete(id)
    }
    change(id,upload){
        return UserRepository.update(id,upload)
    }
    searchBy(param){
        if(param.phoneNumber || param.email)
        return UserRepository.searchByPhoneNumber(param.phoneNumber) || UserRepository.searchByEmail(param.email)
    }
}

module.exports = new UserService();