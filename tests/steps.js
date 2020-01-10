const { goto, focus, textBox, write, press, text, alert, tap, click, button, $, evaluate, link, currentURL, title, clear, openTab, switchTo } = require("taiko");
const axios = require('axios');

step("Goto Google", async () => {
    await goto('https://www.google.com/');
})

step("Search for <name>", async (name) => {
    await focus(textBox({class : "gLFyf gsfi"}));
    await clear(textBox({class: "gLFyf gsfi"}));
    if (name == "apiResult") {
        await write(gauge.dataStore.specStore.get("apiTitle"));
    }
    else {
        await write(name);
    }
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

step("Run an API", async () => {
    let response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    // console.log(response);
    let { data : {userId, id, title}} = response;
    // console.log(userId);
    // console.log(id);
    console.log(title);
    gauge.dataStore.specStore.put("apiTitle", title);
})

step("Post name <name>", async (name) => {
    let response = await axios.post('https://jsonplaceholder.typicode.com/posts', {"firstName": name});
    // console.log(response);
    let { data : {firstName}} = response;
    if (firstName == name) {
        console.log("post request successfull");
    }
    else {
        console.log("post request failed");
    }
})