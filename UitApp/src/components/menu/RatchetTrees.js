class Node {
  constructor(_id) {
    this._id = _id;
    this.right = null;
    this.left = null;
  }
}

export default class RatchetTrees {
  constructor(_id) {
    if (_id) {
      const newNode = new Node(_id);
      this.root = newNode;
    } else this.root = null;
  }
  inOrder2(_id) {
    let visited = [],
      current = this.root;
    let temp = 0;
    let traverse = (node, temp, _id) => {
      // console.log(node._id);
      // console.log("temp: ", temp,_id);
      temp = temp + 1;
      // console.log("node._id:",node._id,"temp:", temp,"_id:",_id);
      if (node.left) traverse(node.left, temp, _id);
      else if (temp === _id) visited.push(null);
      visited.push(node._id);
      if (node.right) traverse(node.right, temp, _id);
      else if (temp === _id) visited.push(null);
    };
    traverse(current, temp, _id);
    return visited;
  }
  addNode2(_id2, _depth) {
    const newNode = new Node(_id2);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    let temp = 0,
      check = false;
    const traverse = (node, temp, _id) => {
      temp = temp + 1;
      // console.log("111node._id:",node._id,"temp:", temp,"_id:",_id);
      if (node.left) traverse(node.left, temp, _depth);
      if (node.right) traverse(node.right, temp, _depth);
      else {
        if (temp === _depth && !check) {
          check = true;
          let te = new Node(node._id);
          node._id = "mer" + te._id + "vs" + newNode._id;
          // console.log("te",te, "newnode", newNode);
          node.right = newNode;
          node.left = te;
          return this;
        }
      }
    };
    traverse(current, temp, _depth);
  }
  getPath(_idToFind) {
    let handling = (root, _idToFind) => {
      if (root._id === _idToFind) {
        return [[root._id], [], []];
      }
      if (root.left) {
        const result = handling(root.left, _idToFind);
        if (result) {
          // unshift: add this node's _idue to the beginning of the array
          result[0].unshift(root._id);
          result[1].unshift("left");
          result[2].unshift(root.right._id);
          return result;
        }
      }
      if (root.right) {
        const result = handling(root.right, _idToFind);
        if (result) {
          result[0].unshift(root._id);
          result[1].unshift("right");
          result[2].unshift(root.left._id);
          return result;
        }
      }
    };
    return handling(this.root, _idToFind);
  }

  inOrder() {
    let visited = [],
      current = this.root;

    let traverse = node => {
      if (node.left) traverse(node.left);
      visited.push(node._id);
      if (node.right) traverse(node.right);
    };

    traverse(current);
    return visited;
  }
  addNode(_id) {
    const newNode = new Node(_id);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    const addSide = side => {
      if (!current[side]) {
        current[side] = newNode;
        return this;
      }
      current = current[side];
    };

    while (true) {
      if (_id === current._id) return this;
      if (_id < current._id) addSide("left");
      else addSide("right");
    }
  }
  removeNode(path, _id) {
    let current = this.root;
    for (let i = 0; i < path.length - 2; i++) {
      if (path[i] === "left") current = current.left;
      else current = current.right;
      // current = current[path[i]];
    }
    console.log(current);
    // console.log([path.length - 2])
    console.log(current[path[path.length - 2]]);
    if (current[path[path.length - 2]].left._id === _id)
      current[path[path.length - 2]] = current[path[path.length - 2]].right;
    else current[path[path.length - 2]] = current[path[path.length - 2]].left;
    return this;
  }

  toGraphviz() {
    let queue = [],
      str = "",
      current = this.root;

    queue.push(current);
    while (queue.length) {
      current = queue.shift();

      if (current.left) {
        queue.push(current.left);
        str += current._id + " -> " + current.left._id + ";";
      }
      if (current.right) {
        queue.push(current.right);
        str += current._id + " -> " + current.right._id + ";";
      }
    }
    // return "`graph {" + str + "}`";
    return str;
  }
}
