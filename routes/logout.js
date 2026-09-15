const express = require("express");
const router = express.Router();

const controllers = require("../controllers/logout-controllers")

router.post("/logout", controllers.logout)

// router.post("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Logout error:", err);
//       return res.status(500).send("Terjadi kesalahan saat logout.");
//     }

//     res.clearCookie("connect.sid");
//     res.redirect("/");
//   });
// });

module.exports = router;