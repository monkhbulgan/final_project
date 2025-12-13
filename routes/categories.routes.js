const router = require("express").Router();
const ctrl = require("../controllers/category.controller");
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");

router.post("/", requireAuth, requireRole("admin"), ctrl.createCategory);
router.get("/", ctrl.getCategories);
router.get("/:id", ctrl.getCategory);
router.put("/:id", requireAuth, requireRole("admin"), ctrl.updateCategory);
router.delete("/:id", requireAuth, requireRole("admin"), ctrl.deleteCategory);

module.exports = router;
