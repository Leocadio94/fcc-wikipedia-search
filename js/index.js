$(document).ready(function() {
  $("#close").hide();
  $("#results").hide();

  $("#searchbar").focus(function() {
    $("#close").show();
    $(this).addClass("clearable");
  });

  $("#searchform").submit(function() {
    $("#wikipedia")
      .removeClass("wikipedia-center", 'fast', "easeOutSine")
      .addClass("wikipedia-top", 'fast', "easeOutSine");
    $("#description").hide();
    $("#results").show();
    $("#results").html("");
    $.getJSON('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&rawcontinue=1&titles=&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=' + $("#searchbar").val() + '&gsrlimit=10&callback=?', function(data) {
      var r = JSON.parse(JSON.stringify(data));
      console.log(r.query.pages);
      $.each(r.query.pages, function() {
        $("#results").append(
          "<br>" +
          "<a href='http://en.wikipedia.org/?curid=" + $(this)[0].pageid + "' target='_blank'>" +
          "<div class='result text-left'>" +
          "<h1>" + $(this)[0].title + "</h1>" +
          $(this)[0].extract + "</div>" +
          "</a>"
        );
      });
      $("#results").append("<br>");
    });
    return false;
  });

  $("#close").on("click", function() {
    $("#searchbar").val('');
    $("#searchbar").removeClass("clearable");
    $("#wikipedia")
      .removeClass("wikipedia-top", 'fast', "easeOutSine")
      .addClass("wikipedia-center", 'fast', "easeOutSine");
    $(this).hide();
    $("#description").show();
    $("#results").hide();
    $("#results").html("");
  });
});