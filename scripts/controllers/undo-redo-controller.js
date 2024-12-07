export class UndoRedoController
{
    constructor()
    {
        this.commandHistory = [];
        this.redoStack = [];
    };

    //Redo operation - executing lastUndone command and adding itself to command history
    applyRedo()
    {
        if (this.redoStack.length > 0)
        {
            const lastUndoneCommand = this.redoStack.pop();
            lastUndoneCommand.redo();
            this.commandHistory.push(lastUndoneCommand);
        }
    };

    //Undo operation - executing last executed command and adding itself to redo stack
    applyUndo()
    {
        if (this.commandHistory.length > 0)
        {
            const lastCommand = this.commandHistory.pop();
            lastCommand.undo();
            this.redoStack.push(lastCommand);
        }
    };
};