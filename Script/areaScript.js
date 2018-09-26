$("ul.area-list > li.select_form_b a, ul.area-list > li.select_form_a a").each(function() {
  console.log("find area id " + $(this).attr("id"));
});
$("ul.area-list > li:not(:has(a))").hide();
