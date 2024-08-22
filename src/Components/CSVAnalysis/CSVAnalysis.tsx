import { FileUploader } from "react-drag-drop-files";
import React, { useState } from "react";
import Papa from "papaparse";

const fileTypes = ["CSV"];

function CSVAnalysis() {
  const [headers, setHeaders] = useState<string[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
    console.log(file);

    Papa.parse(file, {
      header: true,
      complete: function (results, file) {
        console.log("Parsing complete:", results, file);
        let data: any = results["data"][0];
        console.log(Object.keys(data));
        setHeaders(Object.keys(data));
        // executed after all files are complete
      },
    });
  };

  return (
    <div>
      <h2>CSV Analysis</h2>
      <h3>Step 1.</h3>
      <span>Upload a CSV with headers</span>
      <br />
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <h3>Select source column</h3>
      <p>{headers}</p>
    </div>
  );
}

export default CSVAnalysis;
