const addButton = document.getElementById("AddStyle");
const undoButton = document.getElementById("Undo");
const ResetButton = document.getElementById("ResetStyle");

const bg_color = document.getElementById("bg-col");
const font_weight = document.getElementById("f-weight");
const font_size = document.getElementById("f-size");

var styleHistory = [];
// Command Pattern
class CommandSelector {
    constructor() {
        this.commands = {};
        this.history = [];

    }

    addCommand(name, command) {
        this.commands[name] = command;
    }

    execute(name) {
        this.commands[name].execute();
        this.history.push(this.commands[name]);
    }

    undo() {
        this.history.pop().undo();
    }

}
// Command Pattern
class AddStyle {
    constructor(selector, style) {
        this.selector = selector;
        this.style = style;

        }

    execute() {

        document.querySelector(this.selector).style.backgroundColor = this.style["backgroundColor"];
        document.querySelector(this.selector).style.fontWeight = this.style["fontWeight"];
        document.querySelector(this.selector).style.fontSize = this.style["fontSize"];
        styleHistory.push(this.style);
        console.log(`Added style`);
    }

    undo() {
        if (styleHistory.length > 1) {
        styleHistory.pop();
        document.querySelector(this.selector).style.backgroundColor = styleHistory[styleHistory.length-1]["backgroundColor"];
        document.querySelector(this.selector).style.fontWeight = styleHistory[styleHistory.length-1]["fontWeight"];
        document.querySelector(this.selector).style.fontSize = styleHistory[styleHistory.length-1]["fontSize"];}
        else {
            document.querySelector(this.selector).style.backgroundColor = "";
            document.querySelector(this.selector).style.fontWeight = "";
            document.querySelector(this.selector).style.fontSize = "";
        }
    }
}
class ResetStyle {
    constructor(selector) {
        this.selector = selector;
    }
    execute() {
        document.querySelector(this.selector).style.backgroundColor = "";
        document.querySelector(this.selector).style.fontWeight = "";
        document.querySelector(this.selector).style.fontSize = "";
        styleHistory = [];
        console.log(`Reset style`);
    }

    undo() {
        alert(`Undo not available`);
    }
}

const commandSelector = new CommandSelector();

// Add commands
addButton.addEventListener("click", () => {
    commandSelector.addCommand("add", new AddStyle(".preview-div",{
        "backgroundColor": bg_color.value,
        "fontWeight": font_weight.value,
        "fontSize": font_size.value
    }));  
    commandSelector.execute("add");
});

undoButton.addEventListener("click", () => {
    commandSelector.undo();
});

ResetButton.addEventListener("click", () => {
    commandSelector.addCommand("reset", new ResetStyle('.preview-div'));
    commandSelector.execute("reset");
});

