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
    const token = jwt.sign({ username }, config.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/home");
  }

  res.render("login", {
    title: "Express and EJS",
    message: `Invalid username or password `,
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

app.post("/saveUser", async (req, res) => {
  const {
    id,
    name,
    phone_number,
    district,
    subdistrict,
    gender,
    date_of_birth,
    blood_group,
    deviceId,
  } = req.body;

  // Ensure required fields are present
  if (!name || !phone_number || !district || !deviceId) {
    return res.status(400).json({
      error: "Name, phone number, district, and device ID are required",
    });
  }

  try {
    let query;
    const values = [
      name,
      phone_number,
      gender || null,
      date_of_birth || null,
      district,
      subdistrict || null, // Add subdistrict to values
      blood_group || null,
    ];
    let result;

    let _id = id;

    if (_id) {
      // Update existing user
      query = `
        UPDATE users
        SET name = ?, phone_number = ?, gender = ?, date_of_birth = ?, district = ?, subdistrict = ?, blood_group = ?
        WHERE id = ?
      `;
      values.push(id);
      [result] = await pool.query(query, values);
    } else {
      // Check if user exists with the same deviceId and phone_number
      const [existingUsers] = await pool.query(
        "SELECT * FROM users WHERE deviceId = ? AND phone_number = ?",
        [deviceId, phone_number]
      );

      if (existingUsers.length > 0) {
        _id = existingUsers[0].id;
        // Update existing user
        query = `
          UPDATE users
          SET name = ?, phone_number = ?, gender = ?, date_of_birth = ?, district = ?, subdistrict = ?, blood_group = ?
          WHERE id = ?
        `;
        values.push(_id);
        [result] = await pool.query(query, values);
      } else {
        // Create new user
        query = `
          INSERT INTO users (name, phone_number, gender, date_of_birth, district, subdistrict, blood_group, deviceId)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        values.push(deviceId);
        [result] = await pool.query(query, values);

        _id = result.insertId;
      }
    }

    // Retrieve the latest user data
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [_id]);

    res.status(200).json({
      message: id ? "User updated successfully" : "User created successfully",
      affectedRows: result.affectedRows,
      user: rows[0],
    });
  } catch (error) {
    console.log(error);
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
