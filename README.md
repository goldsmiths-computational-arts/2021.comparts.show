If you are unfamiliar with git it is recommended you use the  [GitHub Desktop](https://desktop.github.com/)  app to clone the repo.

## Current Site
The url for the live site (DAC 2021) is [https://third.goldcomparts.show](https://third.goldcomparts.show/)

## [Creating a new site](https://github.com/goldsmiths-computational-arts/goldcomparts.show)
Follow the link to learn how to create your own sub-domain.

## [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#getting-started)Getting Started

#### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#running-the-site-locally)Running The Site Locally

Before you start editing the site a good place to start is getting the site to run locally to do this you'll need to ensure you have Node 12.6.0 installed, if you don't have Node installed I recommend using  [nvm](https://github.com/nvm-sh/nvm), once you have nvm installed you should be able to run nvm commands from inside your terminal.

In your terminal access the location of the repo on your local device. Type the  `cd`  command and then drag and drop the folder to save on typing.

Once you're inside the directory within terminal you'll then need to install the node modules (library files) for this project by using  `npm install`. Once node has finished installing the required modules you are ready to run the site locally.

```
npm run dev

```

This will load the project into a localhost that you can access from a web browser, it will tell you in the terminal what the URL for this localhost is. Once the site is running locally, any changes that you make to the code (and save) in your IDE of choice will automatically update your local host preview.

#### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#choosing-your-ide)Choosing Your IDE

Now that you can run the site locally you'll want to edit the site using an IDE. As the site is built using Sapper (we'll get into that later) a lot of the files you'll be editing are in the format .svelte this means it's a good idea to figure out what IDE you want to use and get set up before trying to do any editing/development.

There are a few options available but if you've not got a strong preference stick to  [Visual Studio Code](https://code.visualstudio.com/)  as it has an  [extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)  for working with Sapper or,  [Sublime Text](https://www.sublimetext.com/)  which is a lightweight code editor which  [can be set up](https://svelte.dev/blog/setting-up-your-editor)  to read .svelte documents as HTML.

## [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#editing-the-site)Editing The Site

Once you've chosen your IDE and you've opened up the GitHub repo you'll probably be wondering where's the index.html and what are all these files. The site is using a component framework called  [Sapper](https://sapper.svelte.dev/docs)  it's a bit like  [Redux](https://react-redux.js.org/)  or  [Nuxt](https://nuxtjs.org/)  for  [React](https://reactjs.org/)  and  [Vue](https://vuejs.org/). But if that doesn't mean anything to you it just means it's a way to build a website that is quicker to load and cheaper to run.

To get started the two folders you'll probably care about the most for now are:

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#static---where-any-media-for-the-site-lives)**static**  - Where any media for the site lives.

It's pretty self-explanatory the  **img**  folder is for the images & the  **css**  folder is for the global CSS. Inside the  **img**  folder, you'll also find  **artworks**  and  **bios**  folders where the images for artists and artworks need to end up.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#src---where-the-code-is-kept)**src**  - Where the code is kept.

Inside the  **src**  folder, you'll find a folder called  **routes**  this is where the pages of the site are kept and you should notice a file called  **index.svelte**  this is the homepage for the site and what will be loaded when a user visits the domain.

You'll also notice some pages like  **about.svelte**  which aren't currently being used. If you wanted to add this page back in or create an entirely new one you need to add the page in the  **sitemap.xml**  file for it to be reachable. If you wanted this page to appear in the navigation bar you would also need to go into the  **components**  folder within  **src**  where you should see  **Nav.svelte**  and edit the array called  `menuItems`.

The  **components**  folder is where you'll find elements of a site that can be reused throughout the site like the top navigation bar  **Nav.svelte**  any changes to these files will happen site-wide.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#svelte)Svelte

The content of these .svelte files is mostly the same as what you'd expect from an HTML file the main difference is the use of  [Svelte](https://svelte.dev/)  this lets you do some things which may look odd if you have only ever used HTML and Javascript it is  **highly recommended**  you go through the  [tutorials](https://svelte.dev/tutorial/basics)  on the svelte website to understand how to use it as it will generally make your life easier and is really easy to pick up. If you ever find yourself needing to write to Javascript for an interaction etc it's worth seeing if there is a way to do it in Svelte rather than vanilla JS as it will often be easier.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#bulma)Bulma

The site also uses the CSS framework  [Bulma](https://bulma.io/)  which saves writing as much CSS in a similar way to how Svelte saves you from writing Javascript. It is worth becoming familiar with if you want to add in any functionality as you will probably find you won't have to do as much work yourself.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#changing-the-basics)Changing The Basics

If you just want to make simple changes to colour schemes or fonts the easiest way to figure out what you need to change is by using the inspector within google chromes development tools. For any element you hover over you will see something like  `div#gradient.svelte-gx22xr`  to find that within the code you just ignore everything before the  **#**  and everything after  **.svelte**  leaving you with  **gradient**  which can just use the find tool in your IDE to see where that code is within the page you're editing.

The first place to look is always the  **.svelte**  of the page you're editing for any styling, if you can't find what you're looking for it will be in the global CSS file found in the static folder  `static/css/global.css`  . You should always do it in this order as you may find someone has overwritten the global CSS within the  **.svelte**  file.

## [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#deployment)Deployment

To publish any changes you've made to your local copy of the site you should follow this checklist.

1.  Save any changes to your local files.
2.  Check that your changes work locally using  `npm run dev`.
3.  Push your changes to the GitHub repo.
4.  Let the other people know within your team that you are about to deploy to the live site as it will break temporarily.
5.  Use  `npm run deploy`  to push your local copy of the site to the live public site.
6.  Check it works on the live site (you might have to wait a couple minutes).

This will export the site to  `public`  and then commit it to the  `gh-pages`  and push it to GitHub

## [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#data-collection-and-implementation)Data Collection and Implementation

Now that you know how to edit and deploy the site, it is time to collect the artist's and artwork's data. The data which generates the site is in the  `data`  folder and is mostly  `.tsv`  (tab-separated values) which can be opened in many spreadsheet programs such as Google Sheets, Numbers, and LibreOffice (avoid Excel, it has issues). It also uses Markdown files for longer text such as biography.

We worked with  [Airtable](https://airtable.com/)  to create the forms we used to collect all required information. As data was being collected, we separated it and input it into the correspondent fields on both the  `artists.tsv`  and the  `artworks.tsv`  files found in  `/data/`. At the beginning of production, doing this once a week should suffice, as the final date approaches, you can do it daily or as often as necessary.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#artiststsv)`artists.tsv`

This spreadsheet contains  

 - `name`  (student name)
 - `otherName`  (artistic name/pseudonym if applicable)
 - `years`  (student year)
 - `website`  (link to student website - include https to avoid bugs)
 - `youtube`  (link to student YouTube channel - just the ID (e.g. UCyMuew7W4dImCTaw-KRxjkQ), not the whole link. If you paste the whole URL you will see it duplicated on the live site)
 - `vimeo`  (link to student Vimeo channel - just the user ID (e.g. user1010101), not the whole link. If you paste the whole URL you will see it duplicated on the live site)
 - `twitch`  (link to student Twitch channel - just the user ID, not the whole link. If you paste the whole URL you will see it duplicated on the live site)
 - `facebook`  (link to student Facebook page - just the user ID (e.g. JaneMo), not the whole link. If you paste the whole URL you will see it duplicated on the live site)
 - `instagram`  (link to student Instagram account - just the user ID (e.g. @010101), not the whole link)
 - `slug`  (student name in slug format for URL)
 - `username`  (student Goldsmiths username - e.g. aaaaa001).

If you change the naming of the current columns, it will break the site if you do not change the code.

Use the current  `artists.tsv`  file as a guide. Save a copy in case you ever need to see a working version.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#artworkstsv)`artworks.tsv`

This spreadsheet contains

 - `timestamp`  (this is irrelevant, leave empty or use a generic stamp)
 - `email`  (student Goldsmiths email address - @gold.ac.uk)
 - `title`  (artwork title - if any student has no title before the deadline, use "untitled" instead, as leaving a combination of empty fields and filled ones might break the site)
 - `videoDocUrl`  (link to artwork documentation video - Vimeo, YouTube, etc)
 - `interactiveUrl`  (link to student external artwork documentation if available - useful if a custom site was built etc)
 - `streamTiwtch`  (student Tiwtch stream link if applicable)
 - `streamYoutube`  (student YouTube stream link if applicable)
 - `themes`  (use this field to generate tags base on theme e.g. Cyberspace, Poetry - to avoid breaking the site, you can leave a '–' instead of an empty field)
 - `media`  (use this field to generate tags base on media e.g. Digital Video, Online Website, Glass, Wood - to avoid breaking the site, you can leave a '-' instead of an empty field)
 - `years`  (student year)
 - `username`  (student Goldsmiths username - e.g. aaaaa001)
 - `numImages`  (number of artwork images the student has submitted, if > 1 a slideshow will appear on the student page).

If you change the naming of the current columns, it will break the site if you do not change the code.

Use the current  `artworks.tsv`  file as a guide. Save a copy in case you ever need to see a working version.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#artworks)`/artworks`

This folder contains all the student artwork description Markdown files. Name each Markdown file with the correspondent student Goldsmith's  `username`  e.g. aaaaa001.md. Fill each file with the correspondent information. One file per student.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#bios)`/bios`

This folder contains all the student biography Markdown files. If you decide not to have bios, then leave as it is. Name each Markdown file with the correspondent student Goldsmith's  `username`  e.g. aaaaa001.md. Fill each file with the correspondent information. One file per student.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#images)Images

The images can be found and are to be place on  `/static/img/artworks/`  and  `static/img/bios/`.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#staticimgartworks)`/static/img/artworks/`

This folder contains all artwork images, the naming logic goes like this: aaaaa001-1.jpeg (artwork image no. 1), aaaaa001-2.jpeg (artwork image no. 2 - if applicable), and so on... aaaaa001-thumb.jpeg (artwork thumbnail image). The main images should be 1920px x 1080px (any other sizes and the site will either stretch them or even break). The thumbnail image can be the same size as the main image or it can be 960px x 540px to increase efficiency.

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#staticimgbios)`/static/img/bios/`

This folder contains all student profile images, the naming logic goes like this: aaaaa001.jpeg. The bio images should be 600px x 600px. Students who fail to provide a "bio" image, will get a grainy colour gradient (unless the current code is changed). Otherwise, make solid colour images for missing bio images (just an idea).

##### [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#staticimg)`/static/img/`

Besides containing the image folders for artworks and bios, this folder also contains all other images used on the site, such as the current speaker images, the home-page GIF, and the favicon, etc.

## [](https://github.com/goldsmiths-computational-arts/third.goldcomparts.show#debugging)Debugging

Most of the errors we found while working on this site were traced back to the spreadsheets and the data in them. If you run into any errors while developing the site (e.g. you might be unable to load the site onto a localhost - server will crash), the first step is to check your Terminal console and look for any prompts that might give you an idea of what is causing the error. 

When this happened to us, and it was somewhat clear the data from the spreadsheets was responsible, we proceeded to try isolating the problem by inspecting each column and each row. Sometimes having some columns with filled and empty cells would break the site (hence why we recommend using "–" on empty `themes` cells or "Untitled" on empty `title` cells if necessary), sometimes having a mix of `https` and `http` links on the `website` cells  would break the site (try adding the "s" to all non-secure links), and so on. 

If it breaks, try going back to the latest working version and work your way up till you can isolate the problem. Look for differences, what is working and what is not. These recommendations might be considered band-aids and might not fix the root cause of the problems, but they can help you move forward.

It is possible to break the deployment of the site through changing the `template.html` and `Meta.svelte` files. This results in the website deploying but not updating the content as the deployment doesn't crawl through the files properly. I found this happened when trying to add extra meta tags for `msapplication-TileColor` & `theme-color` specifically.
