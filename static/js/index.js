/**
 * index.js
 */

var file_load = document.getElementById("file_load");
file_load.addEventListener("change", function(e) {
  var file = file_load.files[0];
  var reader = new FileReader();
  reader.onload = function() {
    editor.setValue(this.result);
  }
  reader.readAsText(file);

});

new Vue({
  el: "#app",

  data: {
    showSide: false,
    running: false,
    history: []
  },

  methods: {
    toggleSide: function() {
      this.showSide = !this.showSide;
    },
    toggleRunning: function() {
      this.running = !this.running;
      if (this.running == false) {
        Harmonic.stop();
      } else {
        Harmonic.start();
      }
    },
    saveFile: function() {
      var blob = new Blob([editor.getValue()], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "my-cave-save-file.txt");
    },
    load: function() {
      document.getElementById("file_load").click();
    },
    stop: function() {
      Harmonic.stop();
    },
    exec: function() {
      // Are we already running? if not, make it so
      this.running = true;
      Harmonic.start();

      if (this.history.indexOf(editor.getValue()) == -1) {
        console.log(this.history);
        // If code has changed, run it.
        eval("{ " + editor.getValue() + "}");
        this.history.push(editor.getValue());
      } else {
        console.log("No change");
      }
    }
  }
});

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/javascript");
editor.setTheme("ace/theme/breakfast");
editor.setFontSize(24);
