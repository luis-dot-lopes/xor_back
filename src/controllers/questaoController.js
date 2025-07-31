import * as questaoService from "../services/questaoService.js";
import { handleError } from "../utils/errorHandler.js";

export const create = async (req, res) => {
  try {
    const questao = await questaoService.createQuestao(req.body);
    res.status(201).json(questao);
  } catch (error) {
    return handleError(res, error, "Erro ao criar questão");
  }
};

export const findAll = async (req, res) => {
  try {
    const questoes = await questaoService.getAllQuestoes();
    res.json(questoes);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar questões");
  }
};

export const findById = async (req, res) => {
  try {
    const questao = await questaoService.getQuestaoById(req.params.id);
    if (!questao)
      return res.status(404).json({ message: "Questão não encontrada" });
    res.json(questao);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar questão por ID");
  }
};

export const update = async (req, res) => {
  try {
    const updated = await questaoService.updateQuestao(req.params.id, req.body);

    if (!updated)
      return res.status(404).json({ message: "Questão não encontrada" });

    res.json(updated);
  } catch (error) {
    return handleError(res, error, "Erro ao atualizar questão");
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await questaoService.deleteQuestao(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Questão não encontrada" });

    res.status(204).send();
  } catch (error) {
    return handleError(res, error, "Erro ao deletar questão");
  }
};
