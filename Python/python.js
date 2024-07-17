
    const output = document.getElementById("output");

    const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      mode: {
        name: "python",
        version: 3,
        singleLineStringErrors: true
      },
      lineNumbers: true,
      indentUnit: 4,
      matchBrackets: true
    });
    editor.setValue("# write your code here"); 

    async function main() {
      let pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });
      return pyodide;
    }

    let pyodideReadyPromise = main();

    function addToOutput(s) {
      output.value += s + "\n";
    }

    async function evaluatePython() {
      output.value = "";
      let pyodide = await pyodideReadyPromise;
      try {
        console.log(editor.getValue());
        pyodide.runPython(`
          import sys
          from js import addToOutput

          class StdOutRedirector:
              def write(self, s):
                  addToOutput(s)
              def flush(self):
                  pass

          sys.stdout = StdOutRedirector()
        `);
        let result = pyodide.runPython(editor.getValue());
        addToOutput(result);
      } catch (err) {
        addToOutput(err);
      }
    }

    // Expose addToOutput to Pyodide
    self.addToOutput = addToOutput;
