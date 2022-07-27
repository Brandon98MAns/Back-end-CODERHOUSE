const fs = require("fs");

module.exports = class Chat {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }

  getAll() {
    const response = fs.readFileSync(this.nameFile, "utf-8");
    if(response === "") {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  save(message) {
    const data = this.getAll();
    data.push(message);
    fs.writeFileSync(this.nameFile, JSON.stringify(data));
  }
}