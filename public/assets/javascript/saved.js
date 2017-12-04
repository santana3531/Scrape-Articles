/* global bootbox */
$(document).ready(function() {

  // create article container to render all articles inside of
  var articleContainer = $(".article-container");

  // event listener for generated buttons
  // and pulling up notes, saving notes and deleting notes of articles
  $(document).on("click", ".btn-delete", "handleArticleDelete");
  $(document).on("click", ".btn-save" , "handleArticleSave");
  $(document).on("click", ".btn-notes", "handleArticleNotes");
  $(document).on("click", ".btn-note-delete", "handleNoteDelete");


// start page on load
  initPage();

  function initPage() {
    // empty the container, run AJAX request for saved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {

    // render headlines to the page
    if (data && data.length) {
      renderArticles(data);
    }
    else {
      renderEmpty();
    }
  });
}

function renderArticles(articles) {
  // this function will append HTML containing article data to our page.
  var articlePanels = [];

  for (var i =0, i < articles.length; i++) {
    articlePanels.push(createPanel(articles[i]));
  }
  articleContainer.append(articlePanels);
}

  
function createPanel(article) {
  // this function will take in single JSON object for article/headlines 
  // formatted HTML for articlePanel
  var panel = $(
    [
    '<div class="panel panel-default">',
    '<div class="panel-heading">',
    '<h3>',
    '<a class="article-link" target="_blank" href='" + article.url + "'>',
    article.headline,
    '</a>',
    '<a class="btn btn-danger delete">',
    'Delete From Saved',
    '</a>',
    '<a class="btn btn-info notes">Article Notes</a>',
    '</h3>',
    '</div>',
    '<div class="panel-body">',
    article.summary,
    '</div>',
    '</div>'
    ].join("")
    );
  // attach article's ID to the JQ to determine what article user wants
  // to delete or open then return panel.
  panel.data("_id", article._id);

  return panel;
}

function renderEmpty() {
  // if there are no articles to view this function will render it to the HTMl
  var emptyAlert = $(
    [
    '<div class="alert alert-warning text-center">',
    '<h4>No Scraped Articles.</h4>',
    '</div>',
    '<div class="panel panel-default">',
    '<div class="panel-heading text-center'
    '<h3>Browse available articles?</h3>',
    '</div>',
    '<div class="panel-body text-center">',
    '</div>',
    '</div>'
    ].join("")
  );
  articleContainer.append(emptyAlert);
}

function renderNotesList(data) {
  // this function will render the note list for notes modal
  // Sets up an array of the notes when finished and
  // keeps a currentNote variable
  var notesToRender = [];
  var currentNote;
  if (!data.notes.length)  {
    // if no notes are saved:
    currentNote = ["<li class='list-group-item'>", "No notes yet.", "</li>"].join("");
    notesToRender.push(currentNote);
  }
  else {
    // loop through all the notes that we do have
    for (var i = 0; i < data.notes.length; i++) {
      currentNote = $(
        [
        "<li class='list-group-item note'>",
        data.notes[i].noteText,
        "<button class='btn btn-danger note-delete'>x</button>",
        "</li>"
        ].join("")
      );
    currentNote.children("button").data("_id", data.notes[i]._id);

    notesToRender.push(currentNote);
    }

  }
    // append the notesToRender to note-container in note modal
    $(".note-container").append(notesToRender);
}
  

function handleArticleDelete() {
  // this function will delete headlines/articles
  // we grab the id to get notes from the panel
  var currentArticle = $(this).parents(".panel").data();
    // grab all notes with headline/article id

  $.get("/api/notes/" + currentArticle._id)then(function(data) {
    // create the notes modal html
    var modalText = [
      
    ]
  })
}




})