# Project Title

Quilt backend service
---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install 
    $ npm start

Project will run on port no- 8888

Overview

main database containers:
1. # keywordsTableMaster ~730MB
- info related to keyword generated from reviews in dashboard i.e it is parent or child keyword, it is synonyms or domain specific or review specific keyword with all its associated keywords
2. # categoryTableMaster ~9GB
- info related to categories. i.e it is brand or product, its review Count, name, parentId.
3. # referenceTableMaster ~83GB
-info related at brand level. i.e keywords and reviews associated with that brand, brand name.
4. #ReviewTables
- to store the reviews


Api's 

/fetchBrandsCategories
- to get categories and brand from categoryTableMaster container 


/fetchKeywords
- to fetch the keywords and reviewsCount from referenceTableMaster and keywordsTableMaster

/fetchSentimentPlot
- 
router.post('/fetchReviews', fetchReviews.postReviews)
router.post('/fetchSentimentDistribution', fetchSentimentDistribution.postSentimentDistribution)
router.post('/countDbData', countDbData.countDbData)
router.post('/updateReview', updateReview.updateReview)
router.post('/saveDashboard', saveDashboard.saveDashboard)
router.post('/getSavedDashboards', getSavedDashboards.getSavedDashboards)
router.post('/shareDashboard', shareDashboard.shareDashboard)
router.post('/getSharedDashboards', getSharedDashboards.getSharedDashboards)
router.post('/saveTopCategoriesBrands', saveTopCategoriesBrands.saveTopCategoriesBrands)
router.get('/fetchTopCategories', fetchTopCategories.fetchTopCategories)
router.get('/fetchTopBrands', fetchTopBrands.fetchTopBrands)
