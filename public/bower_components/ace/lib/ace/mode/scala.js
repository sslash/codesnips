define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var JavaScriptMode = require("./javascript").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var ScalaHighlightRules = require("./scala_highlight_rules").ScalaHighlightRules;

var Mode = function() {
    JavaScriptMode.call(this);
    
    this.$tokenizer = new Tokenizer(new ScalaHighlightRules().getRules());
};
oop.inherits(Mode, JavaScriptMode);

(function() {

    this.createWorker = function(session) {
        return null;
    };

}).call(Mode.prototype);

exports.Mode = Mode;
});
