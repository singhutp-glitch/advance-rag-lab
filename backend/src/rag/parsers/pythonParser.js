import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { normalize } from "path/posix";

export async function pythonadvanceParse(file) {

    const form = new FormData();

    form.append(
        "file",
        fs.createReadStream(file.filePath)
    );

    const response = await axios.post(

        "http://127.0.0.1:8000/parse",

        form,

        {
            headers: form.getHeaders()
        }

    );

    return {
        parsedText: response.data.markdown,
        normalizedDocument: response.data.normalizedDocument
    };
}