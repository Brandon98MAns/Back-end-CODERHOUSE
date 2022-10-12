import autocannon from "autocannon";
import { PassThrough } from "stream";
import { args } from "../../index.js";

const run = (url) => {
	const buff = [];
	const outputStream = new PassThrough();

	const inst = autocannon({
		url,
		connections: 100,
		duration: 20,
	});

	autocannon.track(inst, { outputStream });

	outputStream.on("data", (data) => buff.push(data));

	inst.on("done", () => {
		process.stdout.write(Buffer.concat(buff));
	});
};

const PORT = args.port || 8080;

run(`http://localhost:${PORT}/info`);