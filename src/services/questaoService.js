import db from "../models/index.js";

export const createQuestao = async (questaoData) => {
  try {
    const { opcoes, ...rest } = questaoData;

    const questao = await db.Questao.create({
      ...rest,
    });

    if (opcoes && opcoes.length > 0) {
      const createdOpcoes = await Promise.all(
        opcoes.map((opcao) =>
          db.Opcao.create({ ...opcao, questaoId: questao.id })
        )
      );
      if (questaoData.idItemCorreto) {
        const correctOption = createdOpcoes.find(
          (opt) => opt.id === questaoData.idItemCorreto
        );
        if (correctOption) {
          await questao.update({ idItemCorreto: correctOption.id });
        }
      }
    }

    return getQuestaoById(questao.id);
  } catch (error) {
    throw new Error(`Error creating questao: ${error.message}`);
  }
};

export const getQuestaoById = async (id) => {
  try {
    const questao = await db.Questao.findByPk(id, {
      include: [
        {
          model: db.Opcao,
          as: "opcoes",
          attributes: ["id", "enunciado"],
        },
      ],
    });
    if (!questao) {
      return null;
    }
    return questao;
  } catch (error) {
    throw new Error(`Error fetching questao: ${error.message}`);
  }
};

export const getAllQuestoes = async () => {
  try {
    const questoes = await db.Questao.findAll({
      include: [
        {
          model: db.Opcao,
          as: "opcoes",
          attributes: ["id", "enunciado"],
        },
      ],
    });
    return questoes;
  } catch (error) {
    throw new Error(`Error fetching all questoes: ${error.message}`);
  }
};

export const updateQuestao = async (id, updateData) => {
  try {
    const questao = await db.Questao.findByPk(id);
    if (!questao) {
      return null;
    }

    const { opcoes, ...rest } = updateData;

    await questao.update(rest);

    if (opcoes !== undefined) {
      await db.Opcao.destroy({ where: { questaoId: questao.id } });
      if (opcoes && opcoes.length > 0) {
        const createdOpcoes = await Promise.all(
          opcoes.map((opcao) =>
            db.Opcao.create({ ...opcao, questaoId: questao.id })
          )
        );
        if (updateData.idItemCorreto) {
          const correctOption = createdOpcoes.find(
            (opt) => opt.id === updateData.idItemCorreto
          );
          if (correctOption) {
            await questao.update({ idItemCorreto: correctOption.id });
          }
        }
      } else {
        await questao.update({ idItemCorreto: null });
      }
    }

    return getQuestaoById(questao.id);
  } catch (error) {
    throw new Error(`Error updating questao: ${error.message}`);
  }
};

export const deleteQuestao = async (id) => {
  try {
    const questao = await db.Questao.findByPk(id);
    if (!questao) {
      return null;
    }
    await questao.destroy();
    return { message: "Questao deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting questao: ${error.message}`);
  }
};
