/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Add todo <item>", async (item) => {
    await goto('https://todo.taiko.dev');
    await write(item);
    await press('Enter');
});

step("Complete task", async function () {
    await click(checkBox());
});

step("View <type> tasks", async function (type) {
    await click(type);
});

step("<type> tasks must be empty", async function (type) {
    var elements = await listItem(above(type)).elements();
    assert.ok(elements.length == 0);
});