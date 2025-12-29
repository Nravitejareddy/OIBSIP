const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const usersFile = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(express.static(__dirname));

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile));
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.post('/register', (req, res) => {
  const { fullname, email, username, password } = req.body;
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: "Username already exists" });
  }

  users.push({ fullname, email, username, password });
  saveUsers(users);
  res.json({ success: true, message: "Registration successful" });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
