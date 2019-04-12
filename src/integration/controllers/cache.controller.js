const express = require('express');
const cacheDelegate = require(__base + 'integration/delegates/cache.delegate');

const router = express.Router();

router.get('/cache', async (req, res, next) => {
    try {
        let workflowId = req.query.workflowId;
        let cache = await cacheDelegate.getAll(workflowId);
        res.json(cache);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});
router.get('/cache/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let cache = await cacheDelegate.get(id);

        res.json(cache);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

router.delete('/cache/:id', async (req, res, next) => {
    try {
        let id = req.params.id;

        let cache = await cacheDelegate.deleteCache(id);
        res.json(cache);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

module.exports = router;