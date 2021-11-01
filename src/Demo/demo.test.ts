import { chromium, Page, BrowserContext, Browser } from 'playwright';
import DemoPage from '../../page/demo-page';
import * as data from "../../data/data.json";

let page: Page;
let context: BrowserContext;
let browser: Browser;
declare const reporter: any;
let demo:DemoPage;

    beforeAll(async () => {
        try
        {
            browser = await chromium.launch({headless: false, args:['--start-maximized']});
            context = await browser.newContext({
                viewport: null
            });
            page = await context.newPage();
            jest.setTimeout(50000);
        }
        catch(error){
            console.log((error as Error).message);
        }
        
    });

    beforeEach(async () =>{
        try
        {
            demo = new DemoPage(page);
        }
        catch(e){
            console.log((e as Error).message);
        }
    });

    test('Open Website', async () => {
        try{
            await reporter
                .description("TC_01")
                .story("Open Website");
            await reporter.startStep("Open To Do Link");
            await demo.OpenLink();
            expect(page.isVisible(demo.Title)).toBeTruthy();
            await reporter.endStep();
        }
        catch(e){
            console.log((e as Error).message);
        }
    });

    test('Add To Do Items', async () => {
        try{
            await reporter
                .description("TC_01")
                .story("Add To Do Items");
            await reporter.startStep("Click and add to do items.");
            await demo.AddToDoItems();
            const TotalItemsAdded = (await page.$$(demo.ListOfToDoItems)).length;
            console.log("All Items Added Are : " + TotalItemsAdded);
            let splitFilters: Array<string> = data.ToDoItems.ToDoItems.split(',');
            expect(TotalItemsAdded).toEqual(splitFilters.length);
            console.info('Total Items Added : ' + TotalItemsAdded);
            console.info('Total Items in JSON : ' + splitFilters.length);
            await reporter.endStep();
        }
        catch(e){
            console.log((e as Error).message);
        }
    });

    test('Validation', async () => {
        try{
            await reporter
                .description("TC_01")
                .story("Add To Do Items");
            await reporter.startStep("Mark Complete");
            const listOfElements = await page.$$(demo.ListOfRadioButtons);
            for(let i=0; i<3 ; i++){
                await listOfElements[i].click();
            }

            const TotalItemsAdded = (await page.$$(demo.ListOfToDoItems)).length;
            const CompletedItems = (await page.$$(demo.ListOfCompletedItems)).length;
            const ActiveItems = TotalItemsAdded - CompletedItems;

            console.log('Completed To Do Items : ' + CompletedItems);
            console.log('Active To Do Items : ' + ActiveItems);

            await demo.clickEle(demo.ActiveLink, page);
            const ActiveItemsAfterNavigation = (await page.$$(demo.ListOfActiveItems)).length;
            expect(ActiveItems).toBe(ActiveItemsAfterNavigation);

            await demo.clickEle(demo.CompletedLink, page);
            const CompletedItemsAfterNavigation = (await page.$$(demo.ListOfCompletedItems)).length;
            expect(CompletedItems).toBe(CompletedItemsAfterNavigation);
            
            await reporter.endStep();
        }
        catch(e){
            console.log((e as Error).message);
        }
        
    });

    test('Remove Item', async () => {
        try {
            await reporter
                .description("TC_01")
                .story("Add To Do Items");
            await reporter.startStep("Remove Item");
            await demo.clickEle(demo.AllLink, page);
            await demo.RemoveItem();
            await page.waitForLoadState('domcontentloaded');
            const TotalItemsAfter = (await page.$$(demo.ListOfToDoItems)).length;
            let splitTobeAdded: Array<string> = data.ToDoItems.ToDoItems.split(',');
            let splitToBeRemoved: Array<string> = data.ToDoItems.RemoveItems.split(',');
            const TotalThatShouldBeDisplayed = splitTobeAdded.length - splitToBeRemoved.length;
            expect(TotalThatShouldBeDisplayed).toEqual(TotalItemsAfter);
            await reporter.endStep();
        } catch (e) {
            console.info((e as Error).message)
        }
    });

    afterAll(async() => {
        try{
            await page.close();
            await context.close();
            await browser.close();
        }
        catch(e){
            console.log((e as Error).message);
        }
    });
