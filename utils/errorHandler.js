import { ZodError } from "zod";

export function handleError(
  res,
  error,
  customMessage = "Erro interno do servidor"
) {
  if (error instanceof ZodError) {
    const messages = error.issues.map((issue) => issue.message);
    return res.status(400).json({
      message: "Erro de validação",
      errors: messages,
    });
  }

  console.error(error);
  return res.status(500).json({ message: customMessage });
}
