import type { Page } from 'playwright';
import * as data from "../data/data.json"

export default class DemoPage {
    
    private page : Page;
    
    constructor(page: Page)
    {
        this.page = page;
    }

    //#region Elements

    Title = '//h1[text()="todos"]';

    InputField = 'input[placeholder="What needs to be done?"]';

    ListOfToDoItems = '//ul[@class="todo-list"]/child::*';

    ListOfRadioButtons = '//ul[@class="todo-list"]/child::li/div/input';

    ListOfCompletedItems = '//ul[@class="todo-list"]/child::li[@class = "completed"]';

    ActiveLink = 'a[href="#/active"]';

    CompletedLink = 'a[href="#/completed"]';

    ListOfActiveItems = '//ul[@class="todo-list"]/child::li[@class = ""]';

    //#endregion

    //#region Implementation

    async enterText(ele: string, text: string, page: Page){ await page.fill(ele,text) }

    async clickEle(ele:string, page: Page){await page.click(ele)}

    async OpenLink(){
        await this.page.goto(data.ToDoItems.Link);
    }

    async AddToDoItems(){
        let splitFilters: Array<string> = data.ToDoItems.ToDoItems.split(',');
        for(const toDo in splitFilters){
            await this.enterText(this.InputField, splitFilters[toDo], this.page);
            await this.page.keyboard.press('Enter');
        }
    }

    //#endregion
}
