const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();
router.get("/", (req, res, next) => {
    const fighters = FighterService.getFighters();
    if(fighters.length===0) 
    res.data={error:true,message:"Empty storage or not found"};
    else
    res.data = fighters;
    responseMiddleware(null, req, res, next);
})
router.post("/", createFighterValid, responseMiddleware, (req, res) => {
    if (!res.error) {
        req.body.name=req.body.name.toLowerCase()
        if (FighterService.search(req.body.name)==undefined) {
            req.body.health = 100;
            const newFighter = FighterService.createFighter(req.body);
            res.status(200);
            res.json(newFighter);
        } else {
            res.statusCode = 400;
            res.json({ error: true, message: 'Fighter already exists' });
        }
    }
})

router.get("/:id", (req, res, next) => {
    const fighter = FighterService.getFighter(req.params.id);
    if(fighter===undefined || fighter===null)
        res.data={error:true,message:"Empty storage or not found"};
    else
    res.data = [fighter];
    responseMiddleware(null, req, res, next);
})
router.delete("/:id", (req, res, next) => {
    const deletedFighter = FighterService.deleteFighter(req.params.id);
    if(deletedFighter.length===0)
    res.data={error:true,message:"User does not exist"};
    else
    res.data = deletedFighter;
    responseMiddleware(null, req, res, next);
})
router.put("/:id", updateFighterValid, responseMiddleware, (req, res, next) => {
    if (!res.error) {
        const updateFighter = FighterService.update(req.params.id, req.body)
        res.data = [updateFighter];
        responseMiddleware(null, req, res, next)
    }
})
// TODO: Implement route controllers for fighter

module.exports = router;