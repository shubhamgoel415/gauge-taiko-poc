const { openBrowser, closeBrowser, waitFor, reload, goto, clear, textBox, goBack, focus } = require("taiko");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({headless: headless, args: ['--window-size=1440,900', '--window-position=0,0']});
})

afterSuite(async () => {
    await waitFor(5000);
    await closeBrowser();
})

beforeScenario(async () => {
    await waitFor(2000);
})

afterScenario(async () => {
    // await focus(textBox({class : "whsOnd zHQkBf"}));
    await clear(textBox({class: "whsOnd zHQkBf"}));
    // await goto(gauge.dataStore.specStore.get("url"));
}, { tags : ['refresh']})

afterStep(async (context) => {
    // console.log(context);
    let { currentStep : {step: {actualStepText : actualStepName, parsedStepText : parsedStepName}}} = context; 
    if (actualStepName == "Check if email id exists" && gauge.dataStore.scenarioStore.get("emailExists") == true) {
        // await goto(gauge.dataStore.specStore.get("url"));
        await goBack();
    }
    else if (parsedStepName == "Search for apiResult") {
        await waitFor(2000);
    }
}, {tags: ['refresh']})