// Initial Family Tree Data with a couple as root
let familyData = {
  text: { name: "👴 Grandfather & 👵 Grandmother" },
  children: [
    {
      text: { name: "👨 Father" },
      children: []
    }
  ]
};

// Render the tree
function renderTree() {
  document.getElementById("tree-simple").innerHTML = ""; 
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

// Recursive function to find a parent (supports couples) and add child
function addMember(node, parentName, childName, spouseName = "") {
  // Check if this node matches parentName (or includes it for couples)
  if (node.text.name.includes(parentName)) {
    // If a spouse is added, merge into one node
    if (spouseName) node.text.name = `${node.text.name.split("&")[0].trim()} & ${spouseName}`;
    
    if (!node.children) node.children = [];
    node.children.push({ text: { name: childName } });
    return true;
  }

  if (node.children) {
    for (let child of node.children) {
      if (addMember(child, parentName, childName, spouseName)) return true;
    }
  }
  return false;
}

// Handle form submission
document.getElementById("familyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let parent = document.getElementById("parent").value.trim();
  let spouse = document.getElementById("spouse")?.value.trim() || "";

  if (!name) return;

  if (parent === "" || familyData.text.name.includes(parent)) {
    if (!familyData.children) familyData.children = [];
    let newNodeName = spouse ? `${name} & ${spouse}` : name;
    familyData.children.push({ text: { name: newNodeName } });
  } else {
    let added = addMember(familyData, parent, name, spouse);
    if (!added) alert("Parent not found!");
  }

  document.getElementById("name").value = "";
  if(document.getElementById("spouse")) document.getElementById("spouse").value = "";
  document.getElementById("parent").value = "";

  renderTree();
});

// Initial render
renderTree();
