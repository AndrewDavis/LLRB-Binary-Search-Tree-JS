//This code is janky; but, who cares?

if (false) {
    //Benchmark. Warning: slow!
    window.onload = function() {
        window.outputPre = document.getElementById('outputPre');

        let s;
        let e;
        window.tree = new BinarySearchTree({ allowDuplicates: true });
        let originalsArray = [];
        for (let x = 0; x < 5000000; ++x) {
            originalsArray.push({
                key: Math.round(Math.random() * 10000),
                value: Math.random().toFixed(2)
            });
        }
        let originalsArrayLength = originalsArray.length;
        let treeInsertsArray = [];
        s = performance.now();
        for (let x = 0; x < originalsArrayLength; ++x) {
            treeInsertsArray.push(originalsArray[x]);
        }
        e = performance.now();
        let arrayInsertTime = e - s;
        s = performance.now();
        for (let x = 0; x < originalsArrayLength; ++x) {
            tree.insert(originalsArray[x].key, originalsArray[x].value);
        }
        e = performance.now();
        window.outputPre.innerHTML += '       Tree inserts time: ' + (e - s) / 1000.0 + 's\n';
        s = performance.now();
        treeInsertsArray.sort(function(a, b) {
            return a.key - b.key;
        });
        e = performance.now();
        let arraySortTime = e - s;
        window.outputPre.innerHTML += ' Array insert + sort time: ' + (arrayInsertTime + arraySortTime) / 1000.0 + 's\n';
        window.outputPre.innerHTML += '        Array insert time: ' + (arrayInsertTime) / 1000.0 + 's\n';
        window.outputPre.innerHTML += '          Array sort time: ' + (arraySortTime) / 1000.0 + 's\n\n';

        //Remove duplicates from the array.
        s = performance.now();
        treeInsertsArray = treeInsertsArray.filter(function(node, index, array) {
            if (index == originalsArrayLength - 1 || node.key != array[index + 1].key) {
                return true;
            }
            //Combine the duplicates' values into an array, just like it does in the tree.
            if (Array.isArray(node.value)) {
                node.value.push(array[index + 1].value);
            } else {
                node.value = [ node.value, array[index + 1].value ];
            }
            //Leave the duplicate out.
            return false;
        });
        e = performance.now();
        window.outputPre.innerHTML += 'Array de-duplication time: ' + (e - s) / 1000.0 + 's\n\n';

        let rangeStart = treeInsertsArray[Math.round(treeInsertsArray.length / 2 - 5000)].key;
        let originValue = treeInsertsArray[Math.round(treeInsertsArray.length / 2)].key;
        let rangeEnd = treeInsertsArray[Math.round(treeInsertsArray.length / 2 - 5000)].key;
        let nodesInRange = [];
        s = performance.now();
        let originNode = tree.find(originValue);
        let currentNode = originNode;
        while (currentNode != null && currentNode.key >= rangeStart) {
            // nodesInRange.push(currentNode.key);
            currentNode = BinarySearchTree.getPredecessor(currentNode);
        }
        currentNode = originNode;
        while (currentNode != null && currentNode.key <= rangeEnd) {
            // nodesInRange.push(currentNode.key);
            currentNode = BinarySearchTree.getSuccessor(currentNode);
        }
        e = performance.now();
        window.outputPre.innerHTML += 'Tree range lookup time: ' + (e - s) / 1000.0 + 's\n';
        // window.outputPre.innerHTML += 'Tree range lookup output: ' + JSON.stringify(nodesInRange) + '\n';
        nodesInRange = [];
        s = performance.now();
        let originIndex = treeInsertsArray.findIndex(function(value) { return value.key == originValue; });
        let currentIndex = originIndex;
        while (currentIndex >= 0 && treeInsertsArray[currentIndex].key >= rangeStart) {
            // nodesInRange.push(treeInsertsArray[currentIndex].key);
            --currentIndex;
        }
        currentIndex = originIndex;
        let length = treeInsertsArray.length;
        while (currentIndex <= length && treeInsertsArray[currentIndex].key <= rangeEnd) {
            // nodesInRange.push(treeInsertsArray[currentIndex].key);
            ++currentIndex;
        }
        e = performance.now();
        window.outputPre.innerHTML += 'Array range lookup time: ' + (e - s) / 1000.0 + 's\n';
        // window.outputPre.innerHTML += 'Array range lookup output: ' + JSON.stringify(nodesInRange) + '\n';
    };
} else {
    //Bug check.
    window.onload = function () {
        window.outputPre = document.getElementById('outputPre');

        //Insert and remove elements in a BST adjacent to a sorted array.
        window.tree = new BinarySearchTree({ allowDuplicates: true });
        let treeCheckOriginalArray = [];
        let treeCheckSortedArray = [];
        for (let x = 0; x < 100000; ++x) {
            let key = Math.round(Math.random() * 10000);
            let newInsert = {
                key,
                value: Math.random().toFixed(2)
            };
            if (tree.find(key) == null) {
                treeCheckOriginalArray.push(newInsert);
                treeCheckSortedArray.push(newInsert);
            }
            tree.insert(newInsert.key, newInsert.value);
        }
        // outputPre.innerHTML += tree.toString() + '\n\n';
        treeCheckOriginalArray.sort(function(a, b) {
            return a.key - b.key;
        });
        treeCheckSortedArray.sort(function(a, b) {
            return a.key - b.key;
        });
        let removeKeys = [];
        for (let removeIndex = 0; removeIndex < 10000; ++removeIndex) {
            removeKeys.push(Math.round(Math.random() * 10000));
            tree.remove(removeKeys[removeIndex]);
        }
        treeCheckSortedArray = treeCheckSortedArray.filter(function(v) { return removeKeys.indexOf(v.key) == -1; });
        let removedCount = 100;
        for (let x = 0; x < removedCount; ++x) {
            tree.removeMin();
        }
        treeCheckSortedArray.splice(0, removedCount);
        for (let x = 0; x < removedCount; ++x) {
            tree.removeMax();
        }
        treeCheckSortedArray.splice(-removedCount);
        //Extra testing: insert a bunch more values after the removals.
        // for (let x = 0; x < 100000; ++x) {
        //     let key = Math.round(Math.random() * 10000);
        //     let newInsert = {
        //         key,
        //         value: Math.random().toFixed(2)
        //     };
        //     if (tree.find(key) == null) {
        //         treeCheckOriginalArray.push(newInsert);
        //         treeCheckSortedArray.push(newInsert);
        //     }
        //     tree.insert(newInsert.key, newInsert.value);
        // }

        //Print and test results.
        let originalTreeString = '';
        for (let node of treeCheckOriginalArray) {
            originalTreeString += node.key + ' ';
        }
        let sortedTreeSString =  '   Tree Successors: ';
        let sortedTreePString =  ' Tree Predecessors: ';
        let sortedArraySString = '  Array Successors: ';
        let sortedArrayPString = 'Array Predecessors: ';
        let inconsistencies = 0;
        let currentNode = BinarySearchTree.getFirstNode(tree.root);
        let lastNode;
        for (let node of treeCheckSortedArray) {
            if (currentNode == null) {
                outputPre.innerHTML += "Failure to get successor!\n\n";
                break;
            }
            sortedTreeSString += currentNode.key + ' ';
            sortedArraySString += node.key + ' ';
            if (currentNode.key != node.key) {
                ++inconsistencies;
            }
            lastNode = currentNode;
            currentNode = BinarySearchTree.getSuccessor(currentNode);
        }
        if (currentNode != null) {
            outputPre.innerHTML += "Expected last successor to be null!\n\n";
        }
        currentNode = lastNode;
        if (currentNode != BinarySearchTree.getLastNode(tree.root)) {
            outputPre.innerHTML += "Expected just before last successor to be last node!\n\n";
        }
        treeCheckSortedArray.sort(function(a, b) {
            return b.key - a.key;
        });
        for (let node of treeCheckSortedArray) {
            if (currentNode == null) {
                outputPre.innerHTML += "Failure to get predecessor!\n\n";
                break;
            }
            sortedTreePString += currentNode.key + ' ';
            sortedArrayPString += node.key + ' ';
            if (currentNode.key != node.key) {
                ++inconsistencies;
            }
            lastNode = currentNode;
            currentNode = BinarySearchTree.getPredecessor(currentNode);
        }
        if (currentNode != null) {
            outputPre.innerHTML += "Expected last predecessor to be null!\n\n";
        }
        currentNode = lastNode;
        if (currentNode != BinarySearchTree.getFirstNode(tree.root)) {
            outputPre.innerHTML += "Expected just after last predecessor to be first node!\n\n";
        }

        outputPre.innerHTML += originalTreeString + '\n\n';
        outputPre.innerHTML += 'Removed keys: ' + JSON.stringify(removeKeys) + '\n';
        outputPre.innerHTML += '(Also removed lowest and highest ' + removedCount + ')\n\n';
        outputPre.innerHTML += sortedTreeSString + '\n' + sortedArraySString + '\n\n';
        outputPre.innerHTML += sortedTreePString + '\n' + sortedArrayPString + '\n\n';
        outputPre.innerHTML += 'Inconsistencies found: ' + inconsistencies + '\n\n';

        let findNearestArray = [ -1, 500, 1000, 1000000000 ];
        for (let nearestValue of findNearestArray) {
            s = performance.now();
            let nearestNode = tree.findNearest(nearestValue);
            outputPre.innerHTML += 'Nearest to ' + nearestValue + ': ' + NodeToString(nearestNode) + '\n';
            outputPre.innerHTML += 'Its predecessor: ' + NodeToString(BinarySearchTree.getPredecessor(nearestNode)) + '\n';
            outputPre.innerHTML += 'Its successor: ' + NodeToString(BinarySearchTree.getSuccessor(nearestNode)) + '\n';
            e = performance.now();
            outputPre.innerHTML += (e - s) / 1000.0 + 's\n\n';
        }

        outputPre.innerHTML += '\n\n';
        outputPre.innerHTML += tree.toString();

        outputPre.innerHTML += '\n\nClear/Reset tree:\n';
        tree.clear();
        outputPre.innerHTML += tree.toString();
        outputPre.innerHTML += '\nStill works:\n';
        for (let x = 0; x < 20; ++x) {
            tree.insert(Math.round(Math.random() * 10000), Math.random().toFixed(2));
        }
        outputPre.innerHTML += tree.toString();
    };
}

//TODO: Could convert the below Java code to JS to perform a more thorough, accurate, and academic test.

// /***************************************************************************
// *  Check integrity of red-black tree data structure.
// ***************************************************************************/
// private boolean check() {
//     if (!isBST())            StdOut.println("Not in symmetric order");
//     if (!isRankConsistent()) StdOut.println("Ranks not consistent");
//     if (!is23())             StdOut.println("Not a 2-3 tree");
//     if (!isBalanced())       StdOut.println("Not balanced");
//     return isBST() && isSizeConsistent() && isRankConsistent() && is23() && isBalanced();
// }

// // does this binary tree satisfy symmetric order?
// // Note: this test also ensures that data structure is a binary tree since order is strict
// private boolean isBST() {
//     return isBST(root, null, null);
// }

// // is the tree rooted at x a BST with all keys strictly between min and max
// // (if min or max is null, treat as empty constraint)
// // Credit: Bob Dondero's elegant solution
// private boolean isBST(Node x, Key min, Key max) {
//     if (x == null) return true;
//     if (min != null && x.key.compareTo(min) <= 0) return false;
//     if (max != null && x.key.compareTo(max) >= 0) return false;
//     return isBST(x.left, min, x.key) && isBST(x.right, x.key, max);
// }

// /**
//  * Return the number of keys in the symbol table strictly less than {@code key}.
//  * @param key the key
//  * @return the number of keys in the symbol table strictly less than {@code key}
//  * @throws IllegalArgumentException if {@code key} is {@code null}
//  */
// public int rank(Key key) {
//     if (key == null) throw new IllegalArgumentException("argument to rank() is null");
//     return rank(key, root);
// }

// // number of keys less than key in the subtree rooted at x
// private int rank(Key key, Node x) {
//     if (x == null) return 0;
//     int cmp = key.compareTo(x.key);
//     if      (cmp < 0) return rank(key, x.left);
//     else if (cmp > 0) return 1 + size(x.left) + rank(key, x.right);
//     else              return size(x.left);
// }

// // check that ranks are consistent
// private boolean isRankConsistent() {
//     for (int i = 0; i < size(); i++)
//         if (i != rank(select(i))) return false;
//     for (Key key : keys())
//         if (key.compareTo(select(rank(key))) != 0) return false;
//     return true;
// }

// // Does the tree have no red right links, and at most one (left)
// // red links in a row on any path?
// private boolean is23() { return is23(root); }
// private boolean is23(Node x) {
//     if (x == null) return true;
//     if (isRed(x.right)) return false;
//     if (x != root && isRed(x) && isRed(x.left))
//         return false;
//     return is23(x.left) && is23(x.right);
// }

// // do all paths from root to leaf have same number of black edges?
// private boolean isBalanced() {
//     int black = 0;     // number of black links on path from root to min
//     Node x = root;
//     while (x != null) {
//         if (!isRed(x)) black++;
//         x = x.left;
//     }
//     return isBalanced(root, black);
// }

// // does every path from the root to a leaf have the given number of black links?
// private boolean isBalanced(Node x, int black) {
//     if (x == null) return black == 0;
//     if (!isRed(x)) black--;
//     return isBalanced(x.left, black) && isBalanced(x.right, black);
// }