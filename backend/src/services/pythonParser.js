import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export async function parseDocument(filePath) {

    const form = new FormData();

    form.append(
        "file",
        fs.createReadStream(filePath)
    );

    const response = await axios.post(

        "http://127.0.0.1:8000/parse",

        form,

        {
            headers: form.getHeaders()
        }

    );

    return response.data;
}