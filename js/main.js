function parseOptions (content) {
	// From js-yaml-front-matter - (C) 2012 - MIT License
	// https://github.com/dworthen/js-yaml-front-matter
	var re = /^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/
  	, results = re.exec(content);

  	var yaml = results[2];
  	if(!yaml) {
  		return {};
  	}

  	try {
  		var doc = jsyaml.safeLoad(yaml);
  		return doc;
  	} catch (e) {
  		console.log("Cannot parse provided YAML. Are you sure you formatted it correctly?", e);
  		return {};
  	}
}

function fetchDriveLink (url) {
	var driveLink = url || document.location.hash;
	driveLink = driveLink.slice(1);

	if (driveLink.match("docs.google.com") === null) {
		driveLink = "https://docs.google.com/document/d/" + driveLink + "/pub"
	}

	if (driveLink.match("/pub") === null) {
		driveLink = driveLink.replace(/\/edit$/, "") + "/pub";
	}

	return driveLink;
}

function fetchAndRenderAndReload (driveLink) {
	fetchAndRender(driveLink, function () {
		setTimeout(function () {
			fetchAndRenderAndReload(driveLink);
		}, 3000);
	});
}

function fetchAndRender (driveLink, cb) {
	$.ajax("http://crossorigin.me/" + driveLink).success(function (drivePage) {
		var $page = $("<super>").html(drivePage);
		var $title = $page.find("title");
		if($title.text().match("Not Found")) {
			renderError("Drive Page Not Found", "Please check your URL and try again.");
			return false;
		}

		var $header = $page.find("#header");
		var $content = $page.find("#contents");

		renderDoc($header, $content);
		if (typeof cb === "function") {
			cb();
		}
	});
}

function fetchOptions ($content) {
	$unstyledContent = $content.clone();
	$unstyledContent.find("style,script").remove();
	$unstyledContent.find("p,div").append("\n");
	var yamlParseable = $unstyledContent.text();
	yamlParseable = yamlParseable.replace("”", "\"");
	yamlParseable = yamlParseable.replace("“", "\"");
	return parseOptions(yamlParseable);
}

function processOptions (options, documentTitle) {
	options.name = options.name || documentTitle;
	options.title = options.title || documentTitle;
	options.heading = options.heading || documentTitle;

	return options;
}

function fetchAndProcessOptions ($content, documentTitle) {
	documentTitle = documentTitle || "";
	unprocessedOptions = fetchOptions($content);
	options = processOptions(unprocessedOptions, documentTitle);
	return options;
}

function fetchViewableContent ($content) {
	// Remove YAML
	$viewableContent = $content.clone();
	$yamlItems = $viewableContent.find("> :contains(---)").filter(function (i) {
		if($(this).text().trim() !== "---"){
			return false;
		}

		return true;
	});

	while ($yamlItems.length > 0) {
		var start = $viewableContent.find(">").index($yamlItems.eq(0));
		var end = $viewableContent.find(">").index($yamlItems.eq(1));

		for (i = end; i >= start; i --) {
			$viewableContent.find(">").eq(i).remove();
		}

		$yamlItems = $yamlItems.splice(2);
	}
	return $viewableContent;
}

function setLogo (url, alt) {
	var alt = alt || "";
	$("header #logo").attr("src", url);
	$("header #logo").attr("alt", "");
}

function setHeader (header) {
	$("header h1").text(header);
}

function setContent (content) {
	$("main").html(content);
}

function renderError (header, content) {
	$("#logo").remove();
	
	setHeader(header);
	setContent(content);

	$("body").addClass("error");
}

function renderDoc ($header, $content) {
	documentTitle = $header.text();
	options = fetchAndProcessOptions($content, documentTitle);


	$viewableContent = fetchViewableContent($content);

	document.title = options.title;

	if(typeof options.logo == "undefined") {
		$("#logo").remove();
	} else {
		setLogo(options.logo, options.name);
	}

	setHeader(options.heading);
	setContent($viewableContent.html());
	debugger;
}

$(function ($) {

	var driveLink = fetchDriveLink();

	fetchAndRenderAndReload(driveLink);
});
