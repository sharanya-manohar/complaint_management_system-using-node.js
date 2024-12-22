const Complaint = require('../models/Complaint');
const { findShortestPath } = require('../utils/locationGraph');
const PriorityTree = require('../utils/priorityTree');
const ComplaintQueue = require('../utils/complaintQueue');

const priorityTree = new PriorityTree();
const complaintQueue = new ComplaintQueue();

// File a new complaint
exports.fileComplaint = async (req, res) => {
    try {
        const { category, location, description, priority } = req.body;
        const complaint = new Complaint({ category, location, description, priority });
        await complaint.save();
        res.status(201).json({ success: true, message: "Complaint filed successfully!", complaint });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ priority: -1, createdAt: 1 });
        res.status(200).json({ success: true, complaints });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Resolve a complaint
exports.resolveComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaint.findByIdAndUpdate(id, { status: 'Resolved' }, { new: true });
        res.status(200).json({ success: true, message: "Complaint resolved!", complaint });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Find the shortest path between locations
exports.getShortestPath = (req, res) => {
    try {
        const { from, to } = req.query;
        const path = findShortestPath(from, to);
        res.status(200).json({ success: true, path });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Sort complaints by priority using the priority tree
exports.sortComplaintsByPriority = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        complaints.forEach((complaint) => {
            priorityTree.insert(complaint);
        });

        const sortedComplaints = priorityTree.inOrderTraversal();
        res.status(200).json({ success: true, sortedComplaints });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add complaints to the queue
exports.addToQueue = async (req, res) => {
    try {
        const { id } = req.body;
        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({ success: false, message: "Complaint not found!" });
        }

        complaintQueue.enqueue(complaint);
        res.status(200).json({ success: true, message: "Complaint added to the queue!", complaint });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Resolve the next complaint in the queue
exports.resolveNextInQueue = async (req, res) => {
    try {
        const nextComplaint = complaintQueue.dequeue();

        if (!nextComplaint) {
            return res.status(404).json({ success: false, message: "No complaints in the queue!" });
        }

        const resolvedComplaint = await Complaint.findByIdAndUpdate(
            nextComplaint._id,
            { status: 'Resolved' },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Resolved the next complaint in the queue!",
            resolvedComplaint,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
