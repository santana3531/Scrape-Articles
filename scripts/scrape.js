// javascript to scrape

// require request and cheerio
var request = require("request");
var cheerio = require("cheerio");


// write the function that will scrape from NYTimes (cb for callback)
var scrape = function(cb) {

    // request will take what's on the page of the html
    request("http://www.nytimes.com", function(err, res, body) {

      // 
      var $ = cheerio.load(body);

      // array to save scraped articles data
      var articles = [];

      // find and loop through the articles with "theme-summary" class from NYTimes
      // the section with the articles
      $(".theme-summary").each(function(i, element) {

        // using the theme-summary we grab the article headline by finding the 
        // child with classname "story-heading" 
        var head = $(this).children(".story-heading").text().trim();

        // grab the URL of the articles
        var url = $(this).children(".story-heading").children("a").attr("href");

        // grab any children with the classname "summary" and it's inner text to show a summary of the article
        var sum = $(this).children(".summary").text().trim();


        // clean up the extras from the requested data
        if (head && url && sum) {

          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          // push the requested data to the articles array
          var dataToAdd = {
            headline: headNeat,
            summary: sumNeat,
            url: url
          };


          articles.push(dataToAdd);

        }
      });
      // callback the array of articles
      cb(articles)
    });
};


// export
module.exports = scrape;