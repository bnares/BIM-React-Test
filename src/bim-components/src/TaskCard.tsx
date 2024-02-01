import * as OBC from "openbim-components"
import { ToDoPriority } from "..";

export class TaskCard extends OBC.SimpleUIComponent{

    cardUIClicked = new OBC.Event();

    set description(value: string){
        console.log("setter description: ",value);
        const divElem = this.getInnerElement("description") as HTMLParagraphElement;
        //if(!divElem) return;
        divElem.textContent = value;
    }

    set date(value : Date){
        const divElem = this.getInnerElement("date") as HTMLParagraphElement;
        //if(!divElem) return;
        divElem.textContent = value.toDateString();
    }

    set user(value : string){
        const divElem = this.getInnerElement("user") as HTMLParagraphElement;
        //if(!divElem) return;
        divElem.textContent = value.toUpperCase();
    }

    set priority(value: ToDoPriority){
        const divElem = this.getInnerElement("priority") as HTMLParagraphElement;
        //if(!divElem) return;
        divElem.textContent = value.toString().toUpperCase();
    }

    constructor(components : OBC.Components){
        const template = `
            <div class="todo-item">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; column-gap: 15px; align-items: center;">
                        <span class="material-icons-round" style="padding: 10px; background-color: #686868; border-radius: 10px;">construction</span>
                        <div>
                            <p id="user" style="text-wrap: nowrap; color: #a9a9a9; font-size: var(--font-sm)">USER user</p>
                            <p id="date" style="text-wrap: nowrap; color: #a9a9a9; font-size: var(--font-sm)">Fri, 20 sep</p>
                            <p id="priority">PRIORITY</p>
                            <p id="description">Make anything here as you want, even something longer.</p>
                        </div>
                    </div>
                    <div data-tooeen-slot="actionButtons"></div>
                </div>
            </div>
        `
        super(components, template);
        const taskCardUI = this.get();
        taskCardUI.addEventListener("click",()=>{
            this.cardUIClicked.trigger();
        })
    }
}
