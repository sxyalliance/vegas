// Execute with `node merge.js`
// WARNING: This script does currently not support VariableReferences / variables in your text

import fs from 'node:fs';
import path from 'node:path';

// get file directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const inputDirectory = __dirname;
const outputDir = path.join(__dirname, 'merged');

const mergeNamespaces = (directory) => {
	const files = fs.readdirSync(directory);
	return files.reduce((merged, file) => {
		const namespace = file.split('.')[0];
		const content = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));

		if (merged.startsWith('{')) {
			const parsedMerged = JSON.parse(merged);
			parsedMerged[namespace] = content;
			return JSON.stringify(parsedMerged);
		}

		return JSON.stringify({ [namespace]: content });
	});
};

const flattenNestedKey = (obj, separator, prefix) => {
	const flattened = {};

	for (const key in obj) {
		const value = obj[key];
		const newKey = prefix ? `${prefix}${separator}${key}` : key;

		if (typeof value === 'object') {
			Object.assign(flattened, flattenNestedKey(value, separator, newKey));
		} else {
			flattened[newKey] = value;
		}
	}

	return flattened;
};

for (const directory of fs.readdirSync(inputDirectory)) {
	const directoryPath = path.join(inputDirectory, directory);
	if (!fs.lstatSync(directoryPath).isDirectory()) continue;
	if (directoryPath === outputDir) continue;

	const output = path.join(outputDir, directory + '.json');
	const merged = JSON.parse(mergeNamespaces(directoryPath));
	const flattened = flattenNestedKey(merged, '_');

	fs.writeFileSync(output, JSON.stringify(flattened, null, 4));
	console.log(`Merged ${directory} into ${output}`);
}
