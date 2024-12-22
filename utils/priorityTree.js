class TreeNode {
    constructor(complaint) {
        this.complaint = complaint;
        this.left = null;
        this.right = null;
    }
}

class PriorityTree {
    constructor() {
        this.root = null;
    }

    insert(complaint) {
        const newNode = new TreeNode(complaint);
        if (!this.root) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(node, newNode) {
        if (newNode.complaint.priority <= node.complaint.priority) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    inOrderTraversal() {
        const results = [];
        this._inOrder(this.root, results);
        return results;
    }

    _inOrder(node, results) {
        if (node) {
            this._inOrder(node.left, results);
            results.push(node.complaint);
            this._inOrder(node.right, results);
        }
    }
}

module.exports = PriorityTree;
