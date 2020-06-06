# LLRB-Binary-Search-Tree-JS

A Left-Leaning, Red-Black Binary Search Tree implemented in JavaScript!

Example printable output:

<pre id="outputPre">15 27 62 114 369 406 446 492 498 506 771 773 776 937 954 1003 1158 1161 1204 1285 1297 1494 1594 1597 1628 1690 1848 2395 2572 2670 2748 2801 2874 3119 3146 3227 3244 3340 3362 3464 3729 3801 3957 4011 4275 4303 4630 4760 4799 4806 4947 5042 5080 5141 5295 5499 5569 5630 5716 5734 5758 5873 5994 6200 6435 6644 6875 6904 6932 7010 7098 7145 7235 7239 7500 7573 7742 7925 7984 8003 8165 8185 8368 8693 8701 8738 8891 9017 9084 9195 9279 9372 9435 9461 9490 9514 9580 9585 9896 9967

4630 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: null
├ 7573 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 4630
│ ├ 9084 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7573
│ │ ├ 9461 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9084
│ │ │ ├ 9580 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9461
│ │ │ │ ├ 9896 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9580
│ │ │ │ │ ╞ leaf
│ │ │ │ │ └ 9585 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 9896
│ │ │ │ └ 9514 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9580
│ │ │ │   ╞ leaf
│ │ │ │   └ 9490 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 9514
│ │ │ └ 9372 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9461
│ │ │   ├ 9435 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9372
│ │ │   └ 9279 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9372
│ │ │     ╞ leaf
│ │ │     └ 9195 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 9279
│ │ └ 8185 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 9084
│ │   ├ 8891 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 8185
│ │   │ ├ 9017 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 8891
│ │   │ └ 8701 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 8891
│ │   │   ├ 8738 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 8701
│ │   │   └ 8693 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 8701
│ │   │     ╞ leaf
│ │   │     └ 8368 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 8693
│ │   └ 7984 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 8185
│ │     ├ 8165 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7984
│ │     │ ╞ leaf
│ │     │ └ 8003 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 8165
│ │     └ 7925 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7984
│ │       ╞ leaf
│ │       └ 7742 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 7925
│ └ 6435 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7573
│   ├ 7098 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 6435
│   │ ├ 7235 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7098
│   │ │ ├ 7500 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7235
│   │ │ │ ╞ leaf
│   │ │ │ └ 7239 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 7500
│   │ │ └ 7145 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7235
│   │ └ 6932 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 7098
│   │   ├ 7010 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 6932
│   │   └ 6875 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 6932
│   │     ├ 6904 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 6875
│   │     └ 6644 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 6875
│   └ 5569 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 6435
│     ├ 5873 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5569
│     │ ├ 6200 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5873
│     │ │ ╞ leaf
│     │ │ └ 5994 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 6200
│     │ └ 5716 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 5873
│     │   ├ 5758 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5716
│     │   │ ╞ leaf
│     │   │ └ 5734 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 5758
│     │   └ 5630 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5716
│     └ 5042 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 5569
│       ├ 5141 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5042
│       │ ├ 5499 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5141
│       │ │ ╞ leaf
│       │ │ └ 5295 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 5499
│       │ └ 5080 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5141
│       └ 4799 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 5042
│         ├ 4947 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 4799
│         │ ╞ leaf
│         │ └ 4806 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 4947
│         └ 4760 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 4799
└ 1848 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 4630
  ├ 3227 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1848
  │ ├ 3801 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3227
  │ │ ├ 4011 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3801
  │ │ │ ├ 4303 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 4011
  │ │ │ │ ╞ leaf
  │ │ │ │ └ 4275 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 4303
  │ │ │ └ 3957 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 4011
  │ │ └ 3362 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3801
  │ │   ├ 3729 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3362
  │ │   │ ╞ leaf
  │ │   │ └ 3464 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 3729
  │ │   └ 3340 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3362
  │ │     ╞ leaf
  │ │     └ 3244 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 3340
  │ └ 2801 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3227
  │   ├ 3119 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 2801
  │   │ ├ 3146 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3119
  │   │ └ 2874 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 3119
  │   └ 2572 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 2801
  │     ├ 2748 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 2572
  │     │ ╞ leaf
  │     │ └ 2670 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 2748
  │     └ 2395 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 2572
  └ 1003 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1848
    ├ 1494 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1003
    │ ├ 1597 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1494
    │ │ ├ 1690 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1597
    │ │ │ ╞ leaf
    │ │ │ └ 1628 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 1690
    │ │ └ 1594 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1597
    │ └ 1285 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1494
    │   ├ 1297 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1285
    │   └ 1161 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 1285
    │     ├ 1204 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1161
    │     └ 1158 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1161
    └ 506 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 1003
      ├ 776 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 506
      │ ├ 954 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 776
      │ │ ╞ leaf
      │ │ └ 937 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 954
      │ └ 773 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 776
      │   ╞ leaf
      │   └ 771 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 773
      └ 406 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 506
        ├ 492 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 406
        │ ├ 498 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 492
        │ └ 446 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 492
        └ 114 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 406
          ├ 369 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 114
          └ 62 - - - - - - - - [1] - - - - - - - - (<b>B</b>) - - - - - - - - Parent: 114
            ╞ leaf
            └ 27 - - - - - - - - [1] - - - - - - - - (<b><span style="color: red;">R</span></b>) - - - - - - - - Parent: 62
</pre>

---

## About

This implementation supports lots of advanced functionality like:
- storing both keys and values (values do not affect default functionality or sorting)
- storing duplicate values (if enabled, all values go into an array for each node)
- traversing to the predecessor or successor of any node (in sorted order)
  - bidirectional iteration that does not involve any stacks/arrays and is fast (unlike other implementations out there)
- finding a node with a given key or returning `null` if there is none
- finding the nearest node to a key
- using a custom sorting function (read the code comments regarding this one)
- getting the first and last nodes of a tree or subtree
- printing an entire tree, or even a subtree, as text

It performs at roughly the same speed as a sorted array (because it's JS - the code itself is relatively fast...); **but**, note that it doesn't need to constantly be resorted, like an array would!

---

## How to Use

```js
//Create a new Left-Leaning, Red-Black Binary Search Tree.
let tree = new BinarySearchTree({
    //compareFunction: function(a, b) { return a - b; },
    allowDuplicates: true
});

//Insert a bunch of key->value pairs.
let insertedNode;
for (let x = 0; x < 100000; ++x) {
    //Random key->value pair.
    insertedNode = tree.insert(Math.round(Math.random() * 10000), Math.random().toFixed(2));
}
//Get the last inserted node (or the existing node with multiple values).
tree.nodeInsertedInto == insertedNode;

//Remove nodes with specific keys, if they exist.
for (let removeIndex = 0; removeIndex < 10000; ++removeIndex) {
    tree.remove(Math.round(Math.random() * 10000));
}

//Remove values at the beginning or end.
for (let x = 0; x < 100; ++x) {
    tree.removeMin();
    tree.removeMax();
}

//Insert a bunch more key->value pairs.
for (let x = 0; x < 100000; ++x) {
    //Random key->value pair.
    tree.insert(Math.round(Math.random() * 10000), Math.random().toFixed(2));
}

//See if a node with key 100 is in the tree. Returns `null` if it can't find it.
let findResult = tree.find(100);
//Find a node with key 100; or, if there is none, find the nearest node (based on key).
//Guaranteed to not be `null` unless the tree is empty.
findResult = tree.findNearest(100);
//Access a node's key and value.
findResult.key;
findResult.value;

//Get a node's predecessor or successor (can be called until
//it reaches `null` on either end of the tree).
//Note: This is bidirection-capable!
let neighbor = BinarySearchTree.getPredecessor(findResult);
neighbor = BinarySearchTree.getSuccessor(findResult);
//Access a node's key and value.
neighbor.key;
neighbor.value;

//Get the first and last nodes of a tree or a subtree (pass in a node).
let first = BinarySearchTree.getFirstNode(tree.root);
let last = BinarySearchTree.getLastNode(tree.root);
```

See `test.js` for more examples of its usage, including some sorted array comparison testing and benchmarking code.

---

Special thanks:
- Where a lot of the JS code originated from (heavily modified version of `llrb.js`):
  - https://github.com/mourner/bbtree
  - **Note**: One major custom modification I made to the above (and below) code is adding and maintaining references to each node's parent for navigational purposes (e.g. `findNearest()`, `getPredecessor()`, and `getSuccessor()`).
- The *ultimate* source of the code (Java):
  - https://algs4.cs.princeton.edu/33balanced
  - https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html
  - https://algs4.cs.princeton.edu/33balanced/RedBlackLiteBST.java.html
- For the tree printing code (somewhat modified):
  - https://github.com/LemonPi/bbst
  - Probably the best competing implementation I could find (this one is of a [Treap](https://en.wikipedia.org/wiki/Treap)).