
import { AddRowCommand } from '../commands/index.js';

export class AddRowController
{
    constructor(table, undoRedoController)
    {
        this.table = table;
        this.undoRedoController = undoRedoController;
    };

    init()
    {
        for (let rowNumber = 1; rowNumber <= 3; rowNumber++)
        {
            const currentMaxNumber = this.#getMaxBoxNumber();
            this.addRow(rowNumber, currentMaxNumber);
        }
    };

    //Private method to get max number of boxes
    #getMaxBoxNumber()
    {
        const boxes = this.table.querySelectorAll('.box');
        let maxNumber = 0;
        boxes.forEach(box =>
        {
            const number = parseInt(box.textContent);
            if (number > maxNumber) maxNumber = number;
        });
        return maxNumber;
    };

    //Execution of add row command and adding it to command history for undo/redo use 
    addRow()
    {
        const rowNumber = this.table.rows.length + 1;
        const currentMaxNumber = this.#getMaxBoxNumber();
        const addRowCommand = new AddRowCommand(this.table, rowNumber, currentMaxNumber);
        addRowCommand.execute();
        this.undoRedoController.commandHistory.push(addRowCommand);
    };
};