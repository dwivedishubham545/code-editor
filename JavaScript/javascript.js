
    const output = document.getElementById('output');
  
    const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      mode: 'javascript',
      lineNumbers: true,
      matchBrackets: true,
      indentUnit: 0,
    });
    editor.setValue("console.log(`Hello world`)"); 
    async function evaluateJavaScript() {
      output.value = "";
  
      const code = editor.getValue();
      
      const originalConsoleLog = console.log;
  
      console.log = function(message) {
        output.value += message + '\n';
      };
  
      try {
        const result = eval(code);
        if (result !== undefined) {
          console.log(result);
        }
      } catch (err) {
        console.log('Error: ' + err.message);
      }
  
      console.log = originalConsoleLog; // Restore the original console.log
    };

  