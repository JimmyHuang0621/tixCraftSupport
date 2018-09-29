$("ul.area-list > li:not(:has(a))").hide();

chrome.storage.local.get({
  ProgramAreaAuto: false,
  ProgramArea: 'A'
}, items => {
  if (items.ProgramAreaAuto) {
    $("ul.area-list > li.select_form_b a, ul.area-list > li.select_form_a a").each(function () {
      // console.log("find area id " + $(this).attr("id"));

      // determine ProgramArea
      var determine = $(this).text().indexOf(items.ProgramArea) >= 0

      if (determine) {
        var ProgramAreaID = $(this).attr("id")
        var actualCode = `
        var me = document.currentScript;
        console.log("script params is " + me.getAttribute("params"));
        var ProgramAreaID = me.getAttribute("params");
        window.location.href = areaUrlList[ProgramAreaID];
        `;
        var script = document.createElement('script');
        script.setAttribute("params", ProgramAreaID)
        script.textContent = actualCode;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
        return false
      }
    })
  }
})