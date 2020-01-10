const { goto, focus, textBox, write, press, text, alert, tap, click, button, $, evaluate, link, currentURL, title, openTab, switchTo } = require("taiko");

step("Goto Google", async () => {
    await goto('https://www.google.com/');
})

step("Search for <name>", async (name) => {
    await focus(textBox({class : "gLFyf gsfi"}));
    await write(name);
    await press("Enter");
})

step("Goto 3rd link", async () => {
    // await click($('.LC20lb'));
    await click(link({href: 'https://accounts.google.com/servicelogin'}));
    let currentUrl = await currentURL();
    gauge.dataStore.specStore.put("url", currentUrl);
})

step("Write <email> id", async (email) => {
    await tap(textBox({class : "whsOnd zHQkBf"}));
    await write(email);
})

step("Click next", async () => {
    await click($(".RveJvd"));
})

step("Check if email id exists", async () => {
    let a = await text("Couldn't find your Google Account").exists(0, 2000);
    if (a) {
        console.log("Email doesnt exist");
        gauge.dataStore.scenarioStore.put("emailExists", false);
    }
    else {
        console.log("Email exist");
        gauge.dataStore.scenarioStore.put("emailExists", true);
    }
})

step("Open new Tab", async () => {
    let currentTitle = await title();
    gauge.dataStore.specStore.put("firstPageTitle", currentTitle);
    await openTab();
})
