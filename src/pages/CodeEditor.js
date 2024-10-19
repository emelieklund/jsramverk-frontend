import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

import '../style/CodeEditor.css';

function CodeEditor() {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [output, setOutput] = useState("");

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    let decodedOutput = "default";

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue() || "default";

        if (!sourceCode) return;
        try {
            let data = {
                code: btoa(sourceCode)
            };

            fetch("https://execjs.emilfolino.se/code", {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function(result) {
                decodedOutput = atob(result.data);
                setOutput(decodedOutput);
            });

        } catch (error) {}
    };

    return (
        <div className="code-div" >
            <div className="input-div" >
                <button id="run-button" onClick={runCode} >Run Code</button>
                <Editor
                    className="editor"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    defaultValue="// Replace with some code"
                    onMount = {onMount}
                    value={value}
                    onChange={(value) => setValue(value)}
                />
            </div>
            <div className="output-div" >
                <p>Output</p>

                <div className="output-window" >
                    <p>{output}</p>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;
