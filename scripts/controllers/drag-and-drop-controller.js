import { DragAndDropCommand } from '../commands/index.js';

export class DragAndDropController
{
    constructor(table, undoRedoController)
    {
        this.table = table;
        this.undoRedoController = undoRedoController;
    };

    //Binding event listner to table for drag/drop functionality
    init()
    {
        this.table.addEventListener('dragstart', (event) => this.handleDragStart(event));
        this.table.addEventListener('dragover', (event) => this.allowDrop(event));
        this.table.addEventListener('drop', (event) => this.handleDrop(event));
    };

    //Preventing default behaviour of drop
    allowDrop(event)
    {
        event.preventDefault();
    };
  
    //Transferring dragged element text
    handleDragStart(event)
    {
        if (event.target.classList.contains('box'))
        {
            this.draggedElement = event.target;
            event.dataTransfer.setData("text", this.draggedElement.id);
        }
    };
  
    //Drop source element to target
    handleDrop(event)
    {
        event.preventDefault();
        const targetCell = event.target.closest('td');
        if (targetCell && targetCell !== this.draggedElement.parentNode)
        {
          const targetBox = targetCell.querySelector('.box');
          const dragAndDropCommand = new DragAndDropCommand(this.draggedElement, targetBox);
          dragAndDropCommand.execute();
          this.undoRedoController.commandHistory.push(dragAndDropCommand);
        }
    };
};