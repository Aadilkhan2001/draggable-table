import { DragAndDropController, AddRowController, UndoRedoController } from './controllers/index.mjs';


//Binding necessary event listner
document.addEventListener('DOMContentLoaded', () =>
{
    const tableElement = document.getElementById('draggable-table');

    const undoRedoController = new UndoRedoController(tableElement);
    const dragAndDropController = new DragAndDropController(tableElement, undoRedoController);
    const addRowController = new AddRowController(tableElement, undoRedoController);

    dragAndDropController.init();
    addRowController.init();

    document.getElementById('add-row-button').addEventListener('click', () =>
    {
        addRowController.addRow();
    });
    document.getElementById('undo-button').addEventListener('click', () =>
    {
        undoRedoController.applyUndo();
    });
    document.getElementById('redo-button').addEventListener('click', () =>
    {
        undoRedoController.applyRedo();
    });
});
