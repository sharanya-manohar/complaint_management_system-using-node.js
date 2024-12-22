const express = require('express');
const {
    fileComplaint,
    getComplaints,
    resolveComplaint,
    getShortestPath,
    sortComplaintsByPriority,
    addToQueue,
    resolveNextInQueue,
} = require('../controllers/complaintController');

const router = express.Router();

router.post('/file', fileComplaint);
router.get('/', getComplaints);
router.put('/resolve/:id', resolveComplaint);
router.get('/shortest-path', getShortestPath);
router.get('/sorted-complaints', sortComplaintsByPriority);
router.post('/queue/add', addToQueue);
router.put('/queue/resolve', resolveNextInQueue);

module.exports = router;
