const getRandom = (cant) => {
	let maxNums = 100000000;
	const resultObj = {};
	const cantNum = cant || maxNums;
	for (let i = 0; i < cantNum; i++) {
		const result = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
		const keyFind = Object.keys(resultObj).includes(`${result}`);

		if (keyFind) {
			resultObj[`${result}`] = resultObj[`${result}`] + 1;
		} else {
			resultObj[`${result}`] = 1;
		}
	}
	return resultObj;
};

process.on("message", (msg) => {
	if (msg.msg === "start") {
		process.send(getRandom(msg.cant));
		process.exit();
	} else {
		process.send({ msg: "No se ha iniciado el calculo" });
		process.exit();
	}
});

export default getRandom;
