# Perplexity for Google Sheets

Sometimes your curiosity just doesn't fit into a single Perplexity thread. If that sounds like you, try this flow:
- Get your Perplexity API key
- Install this add-on into Google Sheets
- Make a research table of the kind of information you want to find out. Fell free to use [this one](https://docs.google.com/spreadsheets/d/1XoT2d1qXxbOJbsB9vHmInde81PZNPlpeOJjBE-QOMZ0/edit?usp=sharing) as inspiraton.
- Fill the table using the `RESEARCH()` function

## Installation

This should end up in Google Workspace Marketplace, but Google is taking its sweet time doing their manual review. In the meanwhile you can open a spreadsheet and click "Extensions -> Apps Script". It will open a dedicated script folder for your spreadsheet. Dump (the contents of) `perplexity.gs` file from this repo there and save.

## Usage

Fill a row (or a column) in your table by selecting the first cell there of and defining it as `=RESEARCH(api_key, prompt, item, blanks)`.
For example, the following `=RESEARCH(MY_KEY, $A$1, A3, B$2:D$2)` means that cell $A1$ defines the general task (in this case, "Research the country to find out basic facts for travellers. Answer in a couple of words, not sentences"), cell A3 holds the current country (United Kingdom), And B$2:D$2 is the header, defining which blanks need to be filled for every country. In this case, capital, currency and plug type

## Privacy policy

The add-on doesn't interact with any servers I control (feel free to look at `perplexity.gs` and verify this), so the only parties that get access to your data are [Google](https://support.google.com/docs/answer/10381817?hl=en) and [Perplexity](https://www.perplexity.ai/hub/legal/privacy-policy), not me.

## Terms of service

Do whatever you want with it (including code editing and redistribution) as long as you don't hold me responsible for anything.
