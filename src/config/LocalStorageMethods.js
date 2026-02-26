 // ---------- Auth helpers ----------

function createUser(data) {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    const { email, password, firstName, lastName, contact } = data;

    if (users[email]) {
      return reject("User already exists");
    }

    // ✅ Force admin role if email is admin@admin.com
    const role = email === "admin@admin.com" ? "admin" : "user";

    users[email] =
      role === "admin"
        ? { email, password, role }
        : { firstName, lastName, email, contact, password, role };

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email, role }));

    resolve("Account created successfully");
  });
}

function signInUser({ email, password }) {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email].password === password) {
      // ✅ Force admin role if email is admin@admin.com
      const role = email === "admin@admin.com" ? "admin" : users[email].role || "user";
      localStorage.setItem("currentUser", JSON.stringify({ email, role }));
      resolve("Login successfully");
    } else {
      reject("Invalid email or password");
    }
  });
}

function signOutUser() {
  return new Promise((resolve) => {
    localStorage.removeItem("currentUser");
    resolve("Sign-out successful");
  });
}

function user_is_signin() {
  return new Promise((resolve, reject) => {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      resolve(user);
    } else {
      reject("User is signed out");
    }
  });
}

// ---------- Generic CRUD helpers ----------

function addItem(obj, rootName, id) {
  return new Promise((resolve) => {
    let data = JSON.parse(localStorage.getItem(rootName)) || {};
    if (id) {
      data[id] = obj;
    } else {
      const key = Date.now().toString();
      obj.key = key;
      data[key] = obj;
    }
    localStorage.setItem(rootName, JSON.stringify(data));
    resolve("Successfully added");
  });
}

function addItemWithoutKey(obj, rootName) {
  return new Promise((resolve) => {
    localStorage.setItem(rootName, JSON.stringify(obj));
    resolve("Successfully added");
  });
}

function getItem(rootName, id) {
  return new Promise((resolve, reject) => {
    let data = JSON.parse(localStorage.getItem(rootName)) || {};

    if (id) {
      data[id] ? resolve(data[id]) : reject("Item not found");
    } else {
      resolve(data); // always return object, even if empty
    }
  });
}

function updateItem(obj, rootName, id) {
  return new Promise((resolve, reject) => {
    let data = JSON.parse(localStorage.getItem(rootName)) || {};
    if (data[id]) {
      data[id] = { ...data[id], ...obj };
      localStorage.setItem(rootName, JSON.stringify(data));
      resolve("Data updated successfully");
    } else {
      reject("Item not found");
    }
  });
}

function deleteItem(rootName, id) {
  return new Promise((resolve, reject) => {
    let data = JSON.parse(localStorage.getItem(rootName)) || {};
    if (data[id]) {
      delete data[id];
      localStorage.setItem(rootName, JSON.stringify(data));
      resolve("Successfully deleted");
    } else {
      reject("Item not found");
    }
  });
}

function deleteAllItem(rootName) {
  return new Promise((resolve) => {
    localStorage.removeItem(rootName);
    resolve("All items deleted");
  });
}

// ---------- Image upload simulation ----------

function uploadImage(file, rootName, data, rootName1) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      let store = JSON.parse(localStorage.getItem(rootName1)) || {};
      const key = Date.now().toString();
      store[key] = { ...data, image: base64Image, key };
      localStorage.setItem(rootName1, JSON.stringify(store));
      resolve(key);
    };
    reader.readAsDataURL(file);
  });
}

export {
  createUser,
  signInUser,
  signOutUser,
  user_is_signin,
  addItem,
  addItemWithoutKey,
  getItem,
  updateItem,
  deleteItem,
  deleteAllItem,
  uploadImage,
};
