/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import cheerio from 'cheerio';

let scrapedHTML: Array<string> = []; // Initialize the array
export const GET: RequestHandler = async ({ url }) => {
    try {
        // data = ...
        // getting the data from the cafeteria website
        const response = await axios.get('https://www.auth.gr/weekly-menu/');
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent);

        const dailyMenus = $('.kt-accordion-panel-inner');
        dailyMenus.each(function (idx, el) {
            scrapedHTML[idx] = $(el).html() as string;
        });

    } catch (error) {
        console.error('Error while scraping data:', error);
    }
    return new Response(JSON.stringify(scrapedHTML));

};