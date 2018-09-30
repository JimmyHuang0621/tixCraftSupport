let setting_page_index = []

let setting_page = {
    tixcraft: {
        name: "拓元",
        html: [
            createInput("ProgramAuto", "checkbox", "自動點選節目"),
            createBr(),
            createBr(),
            cteateLabel("節目日期："),
            createInput("ProgramDate", "date"),
            createBr(),
            createBr(),
            createInput("ProgramAreaAuto", "checkbox", "自動點選區域"),
            createBr(),
            createBr(),
            cteateLabel("選取的區域名稱："),
            createInput("ProgramArea", "text"),
            createBr(),
            createBr(),
            cteateLabel("自動選取張數："),
            createSelectList("TicketNumber", ["最大張數", 1, 2, 3, 4]),
            createBr()
        ]
    }
}

for (let index in setting_page) {
    setting_page_index.push(index)
}

function createSettingTabs(Tab_names) {
    let Tabs = document.createElement("div")
    Tabs.className = "tab"
    Tab_names.map(Tab_name => {
        // Tab_button
        let Tab_button = document.createElement("button")
        Tab_button.className = "tablinks"
        Tab_button.onclick = function (event) {
            let i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(Tab_name).style.display = "block";
            event.currentTarget.className += " active";
        }
        Tab_button.innerHTML = setting_page[Tab_name].name
        Tabs.appendChild(Tab_button)
    })
    return Tabs
}

function createSettingPages(Tab_names) {
    return Tab_names.map(Tab_name => {
        let Page = document.createElement("div")
        Page.id = Tab_name
        Page.className = "tabcontent"
        return Page
    })
}

function createSelectList(id, options) {
    let select = document.createElement("select")
    select.id = id
    select.name = id
    options.map((option, index) => {
        let newOption = document.createElement("option")
        newOption.value = index
        newOption.innerHTML = option
        select.appendChild(newOption)
    })
    return select
}

function createInput(id, type, content = "") {
    let label = document.createElement("label")
    let input = document.createElement("input")
    input.setAttribute("type", type)
    input.id = id
    label.innerHTML = input.outerHTML + content
    return content === "" ? input : label
}

function cteateLabel(content = "") {
    let label = document.createElement("label")
    label.innerHTML = content
    return label
}

function createBr() {
    return document.createElement("br")
}

let currentBody = document.getElementById("content")
currentBody.appendChild(createSettingTabs(setting_page_index))
createSettingPages(setting_page_index).map(Page => {
    currentBody.appendChild(Page)
})
setting_page_index.map(setting_page_name => {
    let page = document.getElementById(setting_page_name)
    setting_page[setting_page_name].html.map(v => {
        page.appendChild(v)
    })
})
let status = document.createElement("div")
status.id = "status"
let store = document.createElement("button")
store.id = "save"
store.innerHTML = "Save"
currentBody.appendChild(status)
currentBody.appendChild(store)