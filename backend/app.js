const express = require("express");
const config = require("./config");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For parsing application/json

const dbConfig = {
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
};

const pool = mysql.createPool(dbConfig);

app.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) return res.redirect("/login");
    return res.redirect("/home");
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Express and EJS",
    message: "Welcome to Express and EJS!",
    error: null,
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === config.ADMIN_USERNAME &&
    password === config.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/home");
  }

  res.render("login", {
    title: "Express and EJS",
    message: `Invalid username or password`,
    error: `Invalid username or password`,
  });
});

const formatDate = (date) => {
  const d = new Date(date);
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const Gender = {
  Male: "পুরুষ",
  Female: "নারী",
  Other: "তৃতীয় লিঙ্গ",
  None: "বলতে আগ্রহী নন",
};

app.get("/home", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
    if (err) return res.redirect("/login");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const [users] = await pool.query(
        `
            SELECT *, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age 
            FROM users 
            LIMIT ? OFFSET ?
          `,
        [limit, offset]
      );

      users.forEach((user) => {
        user.date_of_birth = user.date_of_birth
          ? formatDate(user.date_of_birth)
          : "";
        user.gender = user.gender ? Gender[user.gender] : "";
      });

      const [[total]] = await pool.query("SELECT COUNT(*) as count FROM users");

      res.render("home", {
        users,
        currentPage: page,
        totalPages: Math.ceil(total.count / limit),
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send(error);
    }
  });
});

// New addUser endpoint
app.post("/addUser", async (req, res) => {
  const { name, phone_number, district, gender, date_of_birth, blood_group } =
    req.body;

  // Ensure required fields are present
  if (!name || !phone_number || !district) {
    return res
      .status(400)
      .json({ error: "Name, phone_number, and district are required" });
  }

  try {
    const query = `
        INSERT INTO users (name, phone_number, gender, date_of_birth, district, blood_group)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    // Prepare values array based on provided fields
    const values = [
      name,
      phone_number,
      gender || null,
      date_of_birth || null,
      district,
      blood_group || null,
    ];

    await pool.query(query, values);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const query = "DELETE FROM users WHERE id = ?";
    await pool.query(query, [userId]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
