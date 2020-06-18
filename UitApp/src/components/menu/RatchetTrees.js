class Node {
  constructor(info) {
    if (info) {
      this._mssv = info.mssv;
      this._name = info.name;
      // this._publickey = info.publickey;
    }
    else{
      this._mssv = null;
      this._name = null;
      // this._publickey = info.publickey;
    }
    this._publickey = null;
    this._isLeaf = true;
    this._privateKey = null;
    this._pathSecret = null;
    this._nodeSecret = null;
    this.right = null;
    this.left = null;
  }
  rebuildNode(info) {
    let renode = new Node();
    renode._mssv = info._mssv;
    renode._name = info._name;
    renode._publickey = info._publickey;
    renode._isLeaf = info._isLeaf;
    renode._privateKey = info._privateKey;
    renode._pathSecret = info._pathSecret;
    renode._nodeSecret = info._nodeSecret;
    renode.right = null;
    renode.left = null;
    return renode;
  } 
}

export default class RatchetTrees {
  constructor(info) {
    if (info) {
      const newNode = new Node(info);
      this.root = newNode;
    } else this.root = null;
  }
  inOrder2(_mssv) {
    let visited = [],
      current = this.root;
    let temp = 0;
    let traverse = (node, temp, _mssv) => {
      // console.log(node._mssv);
      // console.log("temp: ", temp,_mssv);
      temp = temp + 1;
      // console.log("node._mssv:",node._mssv,"temp:", temp,"_mssv:",_mssv);
      if (node.left) traverse(node.left, temp, _mssv);
      else if (temp === _mssv) visited.push(null);
      visited.push(node._mssv);
      if (node.right) traverse(node.right, temp, _mssv);
      else if (temp === _mssv) visited.push(null);
    };
    traverse(current, temp, _mssv);
    return visited;
  }
  addNode(info, _depth) {
    const newNode = new Node(info);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    let temp = 0,
      check = false;
    const traverse = (node, temp, _mssv) => {
      temp = temp + 1;
      // console.log("111node._mssv:",node._mssv,"temp:", temp,"_mssv:",_mssv);
      if (node.left) traverse(node.left, temp, _depth);
      if (node.right) traverse(node.right, temp, _depth);
      else {
        if (temp === _depth && !check) {
          check = true;
          let te = {...node};
          node._mssv = "mer" + te._mssv + "vs" + newNode._mssv;
          node._name = null;
          node._publickey = null;
          node._privateKey = null;
          node._pathSecret = null;
          node._nodeSecret = null;
          node._isLeaf = false;
          // console.log("te",te, "newnode", newNode);
          node.right = newNode;
          node.left = te;
          return this;
        }
      }
    };
    traverse(current, temp, _depth);
  }
  getPath(_mssvToFind) {
    let handling = (root, _mssvToFind) => {
      if (root._mssv === _mssvToFind) {
        return [[root._mssv], [], []];
      }
      if (root.left) {
        const result = handling(root.left, _mssvToFind);
        if (result) {
          // unshift: add this node's _mssvue to the beginning of the array
          result[0].unshift(root._mssv);
          result[1].unshift("left");
          result[2].unshift(root.right._mssv);
          return result;
        }
      }
      if (root.right) {
        const result = handling(root.right, _mssvToFind);
        if (result) {
          result[0].unshift(root._mssv);
          result[1].unshift("right");
          result[2].unshift(root.left._mssv);
          return result;
        }
      }
    };
    return handling(this.root, _mssvToFind);
  }

  inOrder() {
    let visited = [],
      current = this.root;

    let traverse = node => {
      if (node.left) traverse(node.left);
      visited.push(node._mssv);
      if (node.right) traverse(node.right);
    };

    traverse(current);
    return visited;
  }
  // addBSTNode(_mssv) {
  //   const newNode = new Node(_mssv);
  //   if (!this.root) {
  //     this.root = newNode;
  //     return this;
  //   }
  //   let current = this.root;
  //   const addSide = side => {
  //     if (!current[side]) {
  //       current[side] = newNode;
  //       return this;
  //     }
  //     current = current[side];
  //   };

  //   while (true) {
  //     if (_mssv === current._mssv) return this;
  //     if (_mssv < current._mssv) addSide("left");
  //     else addSide("right");
  //   }
  // }
  removeNode(path, _mssv) {
    let current = this.root;
    for (let i = 0; i < path.length - 2; i++) {
      if (path[i] === "left") current = current.left;
      else current = current.right;
      // current = current[path[i]];
    }
    console.log(current);
    // console.log([path.length - 2])
    console.log(current[path[path.length - 2]]);
    if (current[path[path.length - 2]].left._mssv === _mssv)
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
        str += current._mssv + " -> " + current.left._mssv + ";";
      }
      if (current.right) {
        queue.push(current.right);
        str += current._mssv + " -> " + current.right._mssv + ";";
      }
    }
    // return "`graph {" + str + "}`";
    return str;
  }
  
  serialize() {
    var result = [];
    const serializer = (node, output) => {
      if (!node) {
        output.push("{#}");
        return;
      }
      let a = {
        _mssv : node._mssv,
        _name : node._name,
        _publickey : node._publickey,
        _isLeaf : node._isLeaf,
        _privateKey : node._privateKey,
        _pathSecret : node._pathSecret,
        _nodeSecret : node._nodeSecret,        
      };
      output.push(JSON.stringify(a));
      serializer(node.left, output);
      serializer(node.right, output);
    };
    serializer(this.root, result);
    return JSON.stringify(result);
  }

  deserialize(data) {
    data = JSON.parse(data);
    var index = 0;
    const deserializer = data => {

      if (index > data.length || data[index] === "{#}") {
        return null;
      }
      var data2 = JSON.parse(data[index]);
      let renode = new Node();
      var node = renode.rebuildNode(data2);
      index++;
      node.left = deserializer(data, index);
      index++;
      node.right = deserializer(data, index);
      return node;
    };
    const tree = new RatchetTrees();
    tree.root = deserializer(data);
    return tree;
  }
}
