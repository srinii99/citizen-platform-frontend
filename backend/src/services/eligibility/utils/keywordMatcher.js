export const matchKeywords = (
  sentence = "",
  keywordMap = {}
) => {

  const matches = new Set();

  // Match longer phrases first
  const keywords =
    Object.keys(keywordMap)
      .sort(
        (a, b) => b.length - a.length
      );

  for (const keyword of keywords) {

    const escapedKeyword = keyword.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(
      `\\b${escapedKeyword}\\b`,
      "i"
    );

    if (regex.test(sentence)) {

      matches.add(
        keywordMap[keyword]
      );

    }

  }

  return [...matches];

};