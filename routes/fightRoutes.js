const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


const router = Router();
router.get("/", (req, res, next) => {
    const found = FightService.getAll();
    if(found.length===0) 
    res.data={error:true,message:"Empty storage or not found"};
    else
    res.data = found;
    responseMiddleware(null, req, res, next);
})
router.post('/', (req, res, next) => {
    const newFighHis=FightService.createFight(req.body)
    res.data=[newFighHis]
    responseMiddleware(null,req,res,next)
});
router.delete("/:id", (req, res, next) => {
    const history = FightService.delete(req.params.id)
    history.length > 0 ? res.data = [{ message: "History deleted" }, history] : res.data = { message: "Already deleted or does not exist" }
    responseMiddleware(null, req, res, next)
})
// OPTIONAL TODO: Implement route controller for fights

module.exports = router;