// Execute with `node merge.js`
// WARNING: This script does currently not support VariableReferences / variables in your text

import fs from 'node:fs';
import path from 'node:path';

// get file directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const inputDirectory = __dirname; // Replace with your actual directory path
const outputFile = path.dirname(__dirname) + '/static/messages.json';

const messages = {
	$schema: 'https://inlang.com/schema/inlang-message-format',
	$notes: 'This file was generated by the merge.js script. Do not edit this file manually.',
	data: []
};

// Read all folders in the input directory
for (const folder of fs.readdirSync(inputDirectory)) {
	// Skip files
	if (!fs.statSync(path.join(inputDirectory, folder)).isDirectory()) {
		continue;
	}

	// Extract the language tag from the folder name
	const languageTag = folder;

	const folderPath = path.join(inputDirectory, folder);

	// Read all files in the folder
	for (const file of fs.readdirSync(folderPath)) {
		const filePath = path.join(folderPath, file);

		if (fs.statSync(filePath).isFile() && file.endsWith('.json') && file !== outputFile) {
			const namespace = file.replace('.json', '');

			// Read the JSON file
			const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

			// Iterate through each message in the file
			const flattenMessages = (obj, parentKey = '') => {
				let result = {};
				for (let key in obj) {
					const currentKey = parentKey ? `${parentKey}_${key}` : key;
					if (typeof obj[key] === 'object') {
						result = { ...result, ...flattenMessages(obj[key], currentKey) };
					} else {
						result[currentKey] = obj[key];
					}
				}
				return result;
			};

			const flattenedContent = flattenMessages(content, namespace);

			for (const id in flattenedContent) {
				const existingMessage = messages.data.find((m) => m.id === id);

				if (existingMessage) {
					// Message with the same ID already exists, add a new variant
					existingMessage.variants.push({
						match: [],
						languageTag,
						pattern: [
							{
								type: 'Text',
								value: flattenedContent[id]
							}
						]
					});
				} else {
					// Message does not exist, create a new message
					messages.data.push({
						id,
						selectors: [],
						variants: [
							{
								match: [],
								languageTag,
								pattern: [
									{
										type: 'Text',
										value: flattenedContent[id]
									}
								]
							}
						]
					});
				}
			}
		}
	}
}

// Write the merged messages to the output file
fs.writeFileSync(outputFile, JSON.stringify(messages, undefined, 2));

console.log(`Messages merged and saved to ${outputFile}`);
