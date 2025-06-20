const express = require("express");
const router = express.Router();
const {
  listarTodos,
  listarTodosPorId,
} = require("../../handlers/handlerListar");

router.get("/", listarTodos("enderecos", "id_endereco"));
router.get("/:id", listarTodosPorId("enderecos", "id_cliente"));

module.exports = router;
