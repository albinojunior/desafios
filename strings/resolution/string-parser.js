const newLineReg = /\/n\s|\/n/g;

const StringParser = (txt, limit = 40, justify = false) => {
  const words = txt.replace(/\n/g, " /n ").split(/\s/);
  let rows = [];
  let row = "";
  let lastWord = "";
  let parsedRows = [];

  //cutting words
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (lastWord.length) {
      row = `${row.trim()} ${lastWord}`;
      lastWord = "";
    }

    const newValue = `${row.trim()} ${word}`;
    const newValueParsed = newValue.replace(/.*\/n\s/g, "");
    if (newValueParsed.length <= limit) {
      row = newValue;
      if (i < words.length - 1) continue;
    }

    lastWord = word;
    rows.push(row.trim());
    row = "";
  }

  //cutting rows
  rows.map(row => {
    const parsed = row.replace(/\/n\s/g, "");
    if (parsed.length > limit) {
      let splited = row.split(/\/n\s/g);
      const count = splited.length - 1;
      splited = splited.filter(v => v.length);
      splited.map((row, i) => {
        let tab = "";
        for (let j = 0; j < count; j++) {
          tab += "/n ";
        }
        const value = i == splited.length - 1 ? row : row + tab;
        parsedRows.push(value.trim());
      });
    } else {
      parsedRows.push(row.trim());
    }
  });

  if (justify) {
    //justify text
    parsedRows = parsedRows.map(row => {
      if (row.replace(newLineReg, "").length == limit) return row;
      let diff = limit - row.replace(newLineReg, "").trim().length;
      const splited = row
        .replace(newLineReg, "")
        .trim()
        .split(/\s/);
      const count = row.trim().split(newLineReg).length - 1;
      let newRow = "";
      splited.map(word => {
        let value = word + " ";
        if (diff > 0) {
          value += diff > splited.length - 1 ? "  " : " ";
          diff--;
        }
        newRow += value;
      });
      for (let j = 0; j < count - 1; j++) {
        newRow += "/n ";
      }
      return newRow.trim();
    });
  }

  //concatting rows
  return parsedRows.reduce((text, currentRow) => {
    return `${text}\n${currentRow.trim().replace(newLineReg, "\n")}`;
  });
};

module.exports = StringParser;
