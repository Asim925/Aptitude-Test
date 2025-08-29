export const fetchQuestionsBySubject = async (subject: string) => {
  const res = await fetch(`/api/questions/${encodeURIComponent(subject)}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
