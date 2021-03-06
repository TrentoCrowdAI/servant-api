const express = require('express');
const itemsDelegate = require(__base + 'delegates/items.delegate');

const router = express.Router();

router.get('/items', async (req, res, next) => {
    try {
        let projectId = req.query.projectId;
        let items = await itemsDelegate.getAll(projectId, req.user.id);
        res.json(items);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});
router.get('/items/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let item = await itemsDelegate.get(id, req.user.id);

        res.json(item);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

router.post('/items', async (req, res, next) => {
    try {
        let items = req.body;
        let newItems = await itemsDelegate.createItems(items, req.user.id);
        res.status(201).json(newItems);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

router.put('/items/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let item = req.body;

        item = await itemsDelegate.update(item, id, req.user.id);
        res.json(item);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

router.delete('/items/:id', async (req, res, next) => {
    try {
        let id = req.params.id;

        let item = await itemsDelegate.deleteItem(id, req.user.id);
        res.json(item);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

module.exports = router;