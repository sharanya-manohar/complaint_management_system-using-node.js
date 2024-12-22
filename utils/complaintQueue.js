class ComplaintQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(complaint) {
        this.queue.push(complaint);
    }

    dequeue() {
        if (this.queue.length === 0) {
            return null;
        }
        return this.queue.shift();
    }

    peek() {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    size() {
        return this.queue.length;
    }
}

module.exports = ComplaintQueue;
