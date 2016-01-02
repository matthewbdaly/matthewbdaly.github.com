var $ = window.$ = window.jQuery = require('jquery');
var bootstrapjs = require('bootstrap-sass');
var lunr = require('lunr');

$(document).ready(function () {
    'use strict';

    // Set up search
    var index, store;
    $.getJSON('/lunr.json', function (response) {

        // Create index
        index = lunr.Index.load(response.index);

        // Create store
        store = response.store;

        // Handle search
        $('input#search').on('keyup', function () {
            // Get query
            var query = $(this).val();

            // Search for it
            var result = index.search(query);

            // Output it
            var resultdiv = $('ul.searchresults');
            if (result.length === 0) {
                // Hide results
                resultdiv.hide();
            } else {
                // Show results
                resultdiv.empty();
                for (var item in result) {
                    var ref = result[item].ref;
                    var searchitem = '<li><a href="' + ref + '">' + store[ref].title + '</a></li>';
                    resultdiv.append(searchitem);
                }
                resultdiv.show();
            }
        });
    });

    // Handle Google search
    $('form#searchForm').on('submit', function (event) {
       // Prevent default behaviour
       event.preventDefault();

       // Get domain and search parameters
       var domain = $('input#sitesearch').val();
       var query = $('input#search').val();

       // Redirect to Google
       var url = 'https://www.google.com/search?sitesearch=' + domain + '&q=' + encodeURIComponent(query);
       window.location.href = url;
    });

    // Get GitHub repos
    $.get('https://api.github.com/users/matthewbdaly/repos?type=owner', function (response) {
        var repolist = $('ul#github-repos');
        repolist.empty();
        for (var item in response) {
            // If repo is not a fork, display it
            if (!response[item].fork) {
                repolist.append('<li><a href="' + response[item].html_url + '">' + response[item].name + '</a><p>' + response[item].description + '</p></li>');
            }
        }

        // Get owner details from first item
        var profile = response[0].owner;

        // Insert them
        $('section#github-profile').append('<a id="github-image" href="' + profile.html_url + '" target="_blank"><img src="' + profile.avatar_url + '"></img></a>');
    });

});
