(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('posting-list');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = results[i];
        appendString += '<dd>';
        appendString += '  <div class="media">';
        appendString += '    <div class="media-left">';
        appendString += '      <a href="' + item.url + '" title="' + item.title + '">';
        appendString += '        <img src="../public/assets/category/' + item.image + '" class="rounded">';
        appendString += '      </a>';
        appendString += '    </div>';
        appendString += '    <div class="media-body">';
        appendString += '      <a class="title-org" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + item.index + '. ' + item.title+ '</span></div></a>';
        appendString += '      <a class="title-abb" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + item.index + '. ' + formatTitle(item.title)+ '</span></div></a>';
        appendString += '      <p class="excerpt">' + item.excerpt + '</p>';
        appendString += '      <div class="pull-left">';
        appendString += '          <ul class="list-inline list-unstyled more-att">';
        appendString += '            <li class="list-inline-item hidden-extra"><span><i class="far fa-calendar-alt" style="color:#bc2105"></i></span> ' + item.postdate + '</li>';
        appendString += '            <li class="list-inline-item hidden-extra">|</li>';
        appendString += '            <li class="list-inline-item"><span><i class="fas fa-comments" style="color:#008c25"></i></span> <a href="' + item.url + '#disqus_thread">Comments</a></li>';
        appendString += '            <li class="list-inline-item">|</li>';
        appendString += '            <li class="list-inline-item">';
        appendString += '              <span><i class="fas fa-tags" style="color:#3B5998"></i> ' + item.tags + ' </span>';
        appendString += '            </li>';
        appendString += '            <li class="list-inline-item hidden-extra">|</li>';
        appendString += '            <li class="list-inline-item hidden-extra">';
        appendString += '              <span><i class="fab fa-facebook" style="color:#3B5998"></i></span>';
        appendString += '              <span><i class="fab fa-twitter-square" style="color:#1DA1F2"></i></span>';
        appendString += '              <span><i class="fab fa-google-plus" style="color:#DB4437"></i></span>';
        appendString += '            </li>';
        appendString += '          </ul>';
        appendString += '      </div>';
        appendString += '    </div>';
        appendString += '  </div>';
        appendString += '</dd>';
      }
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = 'No content';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  function jsUcfirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatTitle(title) {
    if (title) {
      if (title.length > 37) {
        title = title.slice(0,37) + "...";
      }
    }
    return title;
  }

  var categoryList = document.getElementById('category-list');
  var postingList = document.getElementById('posting-list');
  var subject = document.getElementById('subject').value;
  var navigation = getQueryVariable('navigation');
  var results = [];
  if (navigation) {
    //$(".page-wrapper").removeClass("toggled");
    categoryList.style.display = "none";
    postingList.style.display = "block";
  } else {
    categoryList.style.display = "block";
    postingList.style.display = "none";
    //$(".page-wrapper").addClass("toggled");
    navigation = jsUcfirst(subject) + ",";
  }

  if (navigation) {
    // bread crumb
    navigation = navigation.substring(0, navigation.length - 1);
    var items = navigation.split(",");
    var appendString = '';
    var navigationPath = '';
    appendString += '<ol class="breadcrumb">';
    for (i = 0; i < items.length; i++) {
      navigationPath += items[i] + ",";
      appendString += '  <li class="breadcrumb-item"><a href="/' + subject + '?navigation=' + navigationPath + '">'+items[i]+'</a></li>';
    }
    appendString += '</ol>';
    var breadcrumbCtrl = document.getElementById('bread-crumb');
    breadcrumbCtrl.innerHTML = appendString;

   // search
    for (var key in window.store) {
      var breadcrumb = window.store[key].breadcrumb;
      if (breadcrumb) {
        //console.log(breadcrumb);
      }
      if (breadcrumb.startsWith("["+navigation)) {
        results.push({
          'id': key,
          'title': window.store[key].title,
          'content': window.store[key].content,
          'url': window.store[key].url,
          'index': window.store[key].index,
          'excerpt': window.store[key].excerpt,
          'tags': window.store[key].tags,
          'postdate': window.store[key].postdate,
          'image': window.store[key].image
        });
      }
    }

    //console.log("results:");
    //console.log(results);
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
