'use strict';

//Code published to: https://github.com/AndrewDavis/LLRB-Binary-Search-Tree-JS

let PrintCharacters = {
       hasNextSiblingRight: '├',
        hasNextSiblingLeft: '╞',
               isLastChild: '└',
    ancestorHasNextSibling: '│',
       ancestorIsLastChild: ' '
};

//Same structure for all nodes.
let LeafNode = {
    key: null,
    value: null,
    isRed: false,
    parentNode: null,
    leftNode: null,
    rightNode: null
};
LeafNode.leftNode = LeafNode;
LeafNode.rightNode = LeafNode;

//Yields a distance and not just a sign value for findNearest() to function properly.
function DefaultCompareFunction(a, b) {
    return a - b;
}

window.NodeToString = function(node) {
    if (node == null) {
        return 'null';
    }
    if (node == LeafNode) {
        return 'leaf';
    }
    return node.key +
        ' - - - - - - - - ' + (Array.isArray(node.value) ? '[' + node.value.length + ']' : node.value) +
        ' - - - - - - - - (<b>' + (node.isRed ? '<span style="color: red;">R</span>' : 'B') + '</b>)' +
        ' - - - - - - - - Parent: ' + (node.parentNode == null ? 'null' : node.parentNode.key);
};

class BinarySearchTree {
    /**
     * Creates an instance of BinarySearchTree, a Left-Leaning, Red-Black Binary Search Tree implementation.
     * See here for more info: https://algs4.cs.princeton.edu/33balanced
     * @param { compareFunction = DefaultCompareFunction, allowDuplicates = false }
     * Note: For findNearest() to function properly, the compareFunction needs to return a distance between keys.
     * Note: If duplicates are allowed, all values will be put into an array. Duplicate keys' values will be pushed onto
     * the end of the array; otherwise, values do not affect the tree's default functionality/sorting in any way.
     */
    constructor({ compareFunction = DefaultCompareFunction, allowDuplicates = false }) {
        this.compareFunction = compareFunction;
        this.allowDuplicates = allowDuplicates;
        this.root = LeafNode;

        if (this.allowDuplicates) {
            this.insert = function (key, value) {
                this.root = BinarySearchTree.insertWithDuplicatesRecursive(this.root, key, value, null, this.compareFunction);
                if (this.root != LeafNode) {
                    this.root.parentNode = null;
                }
                this.root.isRed = false;
            };
        } else {
            this.insert = function (key, value) {
                this.root = BinarySearchTree.insertRecursive(this.root, key, value, null, this.compareFunction);
                if (this.root != LeafNode) {
                    this.root.parentNode = null;
                }
                this.root.isRed = false;
            };
        }
    }

    /**
     * @description Find a node with the given key. If no node exists with the given key, null is returned.
     * @param key
     * @returns
     */
    find(key) {
        let currentNode = this.root;
        while (currentNode != LeafNode) {
            let comparison = this.compareFunction(key, currentNode.key);
            if (comparison === 0) {
                return currentNode;
            }
            currentNode = comparison < 0 ? currentNode.leftNode : currentNode.rightNode;
        }
        return null;
    }

    /**
     * @description Find the node with a key closest to the given key. If the tree is empty, null is returned.
     * Note: This requires the compareFunction to return a distance and not just a sign value.
     * Note: If the posterior or anterior node is already known, use getPredecessor() or getSuccessor() instead.
     * @param key
     * @returns
     */
    findNearest(key) {
        if (this.root == LeafNode) {
            return null;
        }
        let currentNode = this.root;
        let currentDistance;
        let lastNode;
        do {
            currentDistance = this.compareFunction(key, currentNode.key);
            if (currentDistance === 0) {
                return currentNode;
            }
            lastNode = currentNode;
            currentNode = currentDistance < 0 ? currentNode.leftNode : currentNode.rightNode;
        } while (currentNode != LeafNode);
        currentNode = lastNode;
        currentDistance = Math.abs(currentDistance);
        let neighbor = BinarySearchTree.getSuccessor(lastNode);
        let neighborDistance;
        if (neighbor != null) {
            neighborDistance = Math.abs(this.compareFunction(key, neighbor.key));
            if (neighborDistance < currentDistance) {
                currentNode = neighbor;
                currentDistance = neighborDistance;
            }
        }
        neighbor = BinarySearchTree.getPredecessor(lastNode);
        if (neighbor != null) {
            neighborDistance = Math.abs(this.compareFunction(key, neighbor.key));
            if (neighborDistance < currentDistance) {
                currentNode = neighbor;
                currentDistance = neighborDistance;
            }
        }
        return currentNode;
    }

    /**
     * @description Remove a single node with the given key.
     * @param key
     * @returns Whether a node was removed.
     */
    remove(key) {
        if (!this.find(key)) {
            return false;
        }

        if (!this.root.leftNode.isRed && !this.root.rightNode.isRed) {
            this.root.isRed = true;
        }

        this.root = BinarySearchTree.removeRecursive(this.root, key, this.compareFunction);
        if (this.root != LeafNode) {
            this.root.parentNode = null;
        }
        this.root.isRed = false;

        return true;
    }

    /**
     * @description Remove a single node with the lowest key.
     * @returns Whether a node was removed.
     */
    removeMin() {
        if (this.root == LeafNode) {
            return false;
        }
        if (!this.root.leftNode.isRed && !this.root.rightNode.isRed) {
            this.root.isRed = true;
        }

        this.root = BinarySearchTree.removeMinRecursive(this.root);
        if (this.root != LeafNode) {
            this.root.parentNode = null;
        }
        this.root.isRed = false;

        return true;
    }

    /**
     * @description Remove a single node with the highest key.
     * @returns Whether a node was removed.
     */
    removeMax() {
        if (this.root == LeafNode) {
            return false;
        }
        if (!this.root.rightNode.isRed && !this.root.leftNode.isRed) {
            this.root.isRed = true;
        }

        this.root = BinarySearchTree.removeMaxRecursive(this.root);
        if (this.root != LeafNode) {
            this.root.parentNode = null;
        }
        this.root.isRed = false;

        return true;
    }

    /**
     * @description Get the first node of a node and its subtree.
     * @static
     * @param topNode
     * @returns
     */
    static getFirstNode(topNode) {
        let currentNode = topNode;
        while (currentNode.leftNode != LeafNode) {
            currentNode = currentNode.leftNode;
        }
        return currentNode;
    }

    /**
     * @description Get the last node of a node and its subtree.
     * @static
     * @param topNode
     * @returns
     */
    static getLastNode(topNode) {
        let currentNode = topNode;
        while (currentNode.rightNode != LeafNode) {
            currentNode = currentNode.rightNode;
        }
        return currentNode;
    }

    /**
     * @description Get the predecessor node of a given node. Returns null if there is none.
     * @static
     * @param node
     * @returns
     */
    static getPredecessor(node) {
        //If there's a left child, the successor is the left child's right-most node.
        if (node.leftNode != LeafNode) {
            return BinarySearchTree.getLastNode(node.leftNode);
        }
        //If there's no left child, go up the tree. The successor is the first ancestor that is to the left.
        let currentNode = node;
        while (currentNode.parentNode != null && currentNode == currentNode.parentNode.leftNode) {
            currentNode = currentNode.parentNode;
        }
        return currentNode.parentNode;
    }

    /**
     * @description Get the successor node of a given node. Returns null if there is none.
     * @static
     * @param node
     * @returns
     */
    static getSuccessor(node) {
        //If there's a right child, the successor is the right child's left-most node.
        if (node.rightNode != LeafNode) {
            return BinarySearchTree.getFirstNode(node.rightNode);
        }
        //If there's no right child, go up the tree. The successor is the first ancestor that is to the right.
        let currentNode = node;
        while (currentNode.parentNode != null && currentNode == currentNode.parentNode.rightNode) {
            currentNode = currentNode.parentNode;
        }
        return currentNode.parentNode;
    }

    /**
     * @description Convert the entire tree to a string.
     * @param [toStringFunction=NodeToString]
     * @returns
     */
    toString(toStringFunction = NodeToString) {
        return BinarySearchTree.toString(this.root, toStringFunction);
    }

    //Convert a node and its entire subtree to a string.
    static toString(node, toStringFunction) {
        let stringsArray = [ toStringFunction(node), '\n' ];
        BinarySearchTree.treeIndent(node, function (node, indentCharacters) {
            stringsArray.push(indentCharacters.join(' '), ' ', toStringFunction(node), '\n');
        });
        return stringsArray.join('');
    }

    //     /\  "public" functions  /\
    //     \/ "private"  functions \/

    static insertRecursive(node, key, value, parentNode, compare) {
        if (node == LeafNode) {
            //Same structure for all nodes.
            return {
                key,
                value,
                isRed: true,
                parentNode,
                leftNode: LeafNode,
                rightNode: LeafNode
            };
        }

        let comparison = compare(key, node.key);

        if (comparison < 0) {
            node.leftNode = BinarySearchTree.insertRecursive(node.leftNode, key, value, node, compare);
            if (node.leftNode != LeafNode) {
                node.leftNode.parentNode = node;
            }
        } else if (comparison > 0) {
            node.rightNode = BinarySearchTree.insertRecursive(node.rightNode, key, value, node, compare);
            if (node.rightNode != LeafNode) {
                node.rightNode.parentNode = node;
            }
        } else {
            node.value = value;
        }

        if (node.rightNode.isRed && !node.leftNode.isRed) {
            node = BinarySearchTree.rotateLeft(node);
        }
        if (node.leftNode.isRed && node.leftNode.leftNode.isRed) {
            node = BinarySearchTree.rotateRight(node);
        }
        if (node.leftNode.isRed && node.rightNode.isRed) {
            BinarySearchTree.flipColors(node);
        }

        return node;
    }

    static insertWithDuplicatesRecursive(node, key, value, parentNode, compare) {
        if (node == LeafNode) {
            //Same structure for all nodes.
            return {
                key,
                value: [ value ],
                isRed: true,
                parentNode,
                leftNode: LeafNode,
                rightNode: LeafNode
            };
        }

        let comparison = compare(key, node.key);

        if (comparison < 0) {
            node.leftNode = BinarySearchTree.insertWithDuplicatesRecursive(node.leftNode, key, value, node, compare);
            if (node.leftNode != LeafNode) {
                node.leftNode.parentNode = node;
            }
        } else if (comparison > 0) {
            node.rightNode = BinarySearchTree.insertWithDuplicatesRecursive(node.rightNode, key, value, node, compare);
            if (node.rightNode != LeafNode) {
                node.rightNode.parentNode = node;
            }
        } else {
            node.value.push(value);
        }

        if (node.rightNode.isRed && !node.leftNode.isRed) {
            node = BinarySearchTree.rotateLeft(node);
        }
        if (node.leftNode.isRed && node.leftNode.leftNode.isRed) {
            node = BinarySearchTree.rotateRight(node);
        }
        if (node.leftNode.isRed && node.rightNode.isRed) {
            BinarySearchTree.flipColors(node);
        }

        return node;
    }

    static removeMinRecursive(node) {
        if (node.leftNode == LeafNode) {
            return LeafNode;
        }
        if (!node.leftNode.isRed && !node.leftNode.leftNode.isRed) {
            node = BinarySearchTree.moveRedLeft(node);
        }
        node.leftNode = BinarySearchTree.removeMinRecursive(node.leftNode);
        if (node.leftNode != LeafNode) {
            node.leftNode.parentNode = node;
        }
        return BinarySearchTree.balance(node);
    }

    static removeMaxRecursive(node) {
        if (node.leftNode != LeafNode && node.leftNode.isRed) {
            node = BinarySearchTree.rotateRight(node);
        }
        if (node.rightNode == LeafNode) {
            return LeafNode;
        }
        if (!node.rightNode.isRed && !node.rightNode.leftNode.isRed) {
            node = BinarySearchTree.moveRedRight(node);
        }
        node.rightNode = BinarySearchTree.removeMaxRecursive(node.rightNode);
        if (node.rightNode != LeafNode) {
            node.rightNode.parentNode = node;
        }
        return BinarySearchTree.balance(node);
    }

    static removeRecursive(node, key, compare) {
        if (compare(key, node.key) < 0) {
            if (!node.leftNode.isRed && !node.leftNode.leftNode.isRed) {
                node = BinarySearchTree.moveRedLeft(node);
            }
            node.leftNode = BinarySearchTree.removeRecursive(node.leftNode, key, compare);
            if (node.leftNode != LeafNode) {
                node.leftNode.parentNode = node;
            }
        } else {
            if (node.leftNode.isRed) {
                node = BinarySearchTree.rotateRight(node);
            }

            if (compare(key, node.key) === 0 && node.rightNode == LeafNode) {
                return LeafNode;
            }

            if (!node.rightNode.isRed && !node.rightNode.leftNode.isRed) {
                node = BinarySearchTree.moveRedRight(node);
            }

            if (compare(key, node.key) === 0) {
                let currentNode = node.rightNode;
                while (currentNode.leftNode != LeafNode) {
                    currentNode = currentNode.leftNode;
                }
                node.key = currentNode.key;
                node.value = currentNode.value;
                node.rightNode = BinarySearchTree.removeMinRecursive(node.rightNode);
                if (node.rightNode != LeafNode) {
                    node.rightNode.parentNode = node;
                }
            } else {
                node.rightNode = BinarySearchTree.removeRecursive(node.rightNode, key, compare);
                if (node.rightNode != LeafNode) {
                    node.rightNode.parentNode = node;
                }
            }
        }
        return BinarySearchTree.balance(node);
    }

    static rotateRight(node) {
        let oldLeft = node.leftNode;
        node.leftNode = oldLeft.rightNode;
        if (node.leftNode != LeafNode) {
            node.leftNode.parentNode = node;
        }
        oldLeft.rightNode = node;
        if (oldLeft.rightNode != LeafNode) {
            oldLeft.rightNode.parentNode = oldLeft;
        }
        oldLeft.isRed = node.isRed;
        node.isRed = true;
        return oldLeft;
    }

    static rotateLeft(node) {
        let oldRight = node.rightNode;
        node.rightNode = oldRight.leftNode;
        if (node.rightNode != LeafNode) {
            node.rightNode.parentNode = node;
        }
        oldRight.leftNode = node;
        if (oldRight.leftNode != LeafNode) {
            oldRight.leftNode.parentNode = oldRight;
        }
        oldRight.isRed = node.isRed;
        node.isRed = true;
        return oldRight;
    }

    static flipColors(node) {
        node.isRed = !node.isRed;
        node.leftNode.isRed = !node.leftNode.isRed;
        node.rightNode.isRed = !node.rightNode.isRed;
    }

    static moveRedLeft(node) {
        BinarySearchTree.flipColors(node);
        if (node.rightNode.leftNode.isRed) {
            node.rightNode = BinarySearchTree.rotateRight(node.rightNode);
            if (node.rightNode != LeafNode) {
                node.rightNode.parentNode = node;
            }
            node = BinarySearchTree.rotateLeft(node);
            //Following original implementation over JS-conversion.
            BinarySearchTree.flipColors(node);
        }
        return node;
    }

    static moveRedRight(node) {
        BinarySearchTree.flipColors(node);
        if (node.leftNode.leftNode.isRed) {
            node = BinarySearchTree.rotateRight(node);
            //Following original implementation over JS-conversion.
            BinarySearchTree.flipColors(node);
        }
        return node;
    }

    static balance(node) {
        if (node.rightNode.isRed) {
            node = BinarySearchTree.rotateLeft(node);
        }
        if (node.leftNode.isRed && node.leftNode.leftNode.isRed) {
            node = BinarySearchTree.rotateRight(node);
        }
        if (node.leftNode.isRed && node.rightNode.isRed) {
            BinarySearchTree.flipColors(node);
        }
        return node;
    }

    static treeIndent(node, nodeToStringFunction, indentCharacters = []) {
        let noLeftChild = (node.leftNode == LeafNode);
        if (node.rightNode != LeafNode) {
            nodeToStringFunction(node.rightNode,
                indentCharacters.concat(noLeftChild ? PrintCharacters.isLastChild : PrintCharacters.hasNextSiblingRight));
            BinarySearchTree.treeIndent(node.rightNode, nodeToStringFunction,
                indentCharacters.concat(noLeftChild ? PrintCharacters.ancestorIsLastChild : PrintCharacters.ancestorHasNextSibling));
        } else if (!noLeftChild) {
            nodeToStringFunction(LeafNode, indentCharacters.concat(PrintCharacters.hasNextSiblingLeft));
        }
        if (node.leftNode != LeafNode) {
            nodeToStringFunction(node.leftNode, indentCharacters.concat(PrintCharacters.isLastChild));
            BinarySearchTree.treeIndent(node.leftNode, nodeToStringFunction, indentCharacters.concat(PrintCharacters.ancestorIsLastChild));
        }
    }
}

module.exports = BinarySearchTree;