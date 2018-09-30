$("ul.area-list > li:not(:has(a))").hide();

chrome.storage.local.get({
  ProgramAreaAuto: false,
  ProgramAreaList: []
}, items => {
  if (items.ProgramAreaAuto) {
    let $ProgramAreaLink = $("ul.area-list > li.select_form_b a, ul.area-list > li.select_form_a a")
    let ProgramAreaText = $ProgramAreaLink.text()

    for (let ProgramArea of items.ProgramAreaList) {
      // 確認剩下的場次是否是預期得
      if (ProgramAreaText.includes(ProgramArea)) {
        $ProgramAreaLink.each(function () {
          // console.log("find area id " + $(this).attr("id"));

          // 確認預期場次 url 及前往
          if ($(this).text().includes(ProgramArea)) {
            let ProgramAreaID = $(this).attr("id")
            let actualCode = `
            let me = document.currentScript;
            // console.log("script params is " + me.getAttribute("params"));
            let ProgramAreaID = me.getAttribute("params");
            window.location.href = areaUrlList[ProgramAreaID];
            `;
            let script = document.createElement('script');
            script.setAttribute("params", ProgramAreaID)
            script.textContent = actualCode;
            (document.head || document.documentElement).appendChild(script);
            script.remove();

            // 找到場次退出 each
            return false
          }
        })
        // 找到較前順位場次，退出 for loop
        break
      }
    }

  }
})