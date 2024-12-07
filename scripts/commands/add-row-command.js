import { BaseCommand } from '../abstractions/index.js';

export class AddRowCommand extends BaseCommand
{
    constructor(table, rowNumber, currentNumber)
    {
        super();
        this.table = table;
        this.rowNumber = rowNumber;
        this.currentNumber = currentNumber;
        this.newRow = null;
    };

    // Creating a row using table element
    execute()
    {
      const newRow = document.createElement("tr");
      for (let col = 1; col <= 3; col++)
      {
          const newCell = document.createElement("td");
          const newBox = document.createElement("div");
          newBox.classList.add("box");
          newBox.setAttribute("draggable", "true");
          newBox.setAttribute("id", `row-${this.rowNumber}-col-${col}`);
          newBox.setAttribute("data-cell", `row-${this.rowNumber}-col-${col}`);
          newBox.textContent = this.currentNumber + (col * 100);
          newBox.style.backgroundColor = this.getRandomColor();
          newCell.appendChild(newBox);
          newRow.appendChild(newCell);
      }
      this.table.appendChild(newRow);
      this.newRow = newRow;
      this.rowNumber += 1;
      return this.currentNumber + 3;
    };
  
    //Undo operation to remove last created row
    undo()
    {
        if (this.newRow)
        {
            this.table.removeChild(this.newRow);
        }
    };

    //Redo operation to call last executed command
    redo()
    {
       this.execute();
    };
  
    //Utility method to generate random color
    getRandomColor()
    {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const randomColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        return randomColor;
    };
};