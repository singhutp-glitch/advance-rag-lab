import path from "path";
import { parseDocument } from "./pythonParser.js";

const filePath = path.join(
    import.meta.dirname,
    "../testFile/2023_McKinsey_Generative_AI_Report.pdf"
);

const result = await parseDocument(filePath);

console.log(result);