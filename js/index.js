/**
 * index.js
 */

var file_load = document.getElementById("file_load");
file_load.addEventListener("change", function(e) {
  files = file_load.files;
  files.forEach(function(file) {
    // Load into HARMONIC
  });
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
    },
    load: function() {
      document.getElementById("file_load").click();
    },
    exec: function() {
      if (this.history.pop() != editor.getValue()) {
        console.log(this.history.pop() + " is not the same as " + editor.getValue());
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
editor.setTheme("ace/theme/tomorrow");
editor.setFontSize(24);
