import { BaseCommand } from '../abstractions/index.js';

export class DragAndDropCommand extends BaseCommand
{
    constructor(source, target)
    {
        super();
    
        this.source = source;
        this.target = target;

        this.sourceParent = this.source.parentNode;
        this.targetParent = this.target.parentNode;
    };

    //Drag and drop element to source to target and vise versa
    execute()
    {
        if (this.sourceParent !== this.targetParent)
        {
            this.targetParent.appendChild(this.source);
            this.sourceParent.appendChild(this.target);
        }
    };

    //Undo operation to transfer the source and target to its previous state
    undo()
    {
        if (this.sourceParent !== this.targetParent)
        {
            this.sourceParent.appendChild(this.source);
            this.targetParent.appendChild(this.target);
        }
    };

    //Redo operation to call last executed command
    redo()
    {
        this.execute();
    };
}
