// Initial Family Tree Data with couple
let familyData = {
  text: { name: "👴 Grandfather & 👵 Grandmother" },
  children: [
    {
      text: { name: "👨 Father" },
      children: [
        // Add children of Father here
        { text: { name: "👦 Child 1" } },
        { text: { name: "👧 Child 2" } }
      ]
    },
    {
      text: { name: "👩 Aunt" },
      children: [
        { text: { name: "👦 Cousin 1" } }
      ]
    }
  ]
};

// Function to render the tree
function renderTree() {
  document.getElementById("tree-simple").innerHTML = ""; // clear old tree
  new Treant({
    chart: {
      container: "#tree-simple",
      rootOrientation: "NORTH",
      connectors: { type: "curve" },
      node: { HTMLclass: "node-name" }
    },
    nodeStructure: familyData
  });
}

// Recursive function to find a parent and add child
function addMember(node, parentName, childName) {
  if (node.text.name.includes(parentName)) {
    if (!node.children) node.children = [];
    node.children.push({ text: { name: childName } });
    return true;
  }
  if (node.children) {
    for (let child of node.children) {
      if (addMember(child, parentName, childName)) return true;
    }
  }
  return false;
}

// Handle form submission
document.getElementById("familyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let parent = document.getElementById("parent").value.trim();

  if (!name) return;

  if (parent === "" || familyData.text.name.includes(parent)) {
    if (!familyData.children) familyData.children = [];
    familyData.children.push({ text: { name: name } });
  } else {
    let added = addMember(familyData, parent, name);
    if (!added) alert("Parent not found!");
  }

  document.getElementById("name").value = "";
  document.getElementById("parent").value = "";

  renderTree();
});

// Initial render
renderTree();
