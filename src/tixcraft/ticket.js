let data = document.getElementsByTagName('html')[0].innerHTML;
$("#TicketForm_agree").prop('checked', true).prop('name', data.substr(data.indexOf("TicketForm[agree]["), 63));

let data2 = data.substr(data.indexOf("#TicketForm_checked"), 1000);
$("#TicketForm_checked").prop('name', data2.substr(data2.indexOf("TicketForm[ticketPrice][", 100), 69));

let $ticket_options = $("#TicketForm select option");
if ($ticket_options.length) {
  chrome.storage.local.get({
    TicketNumber: 0
  }, items => {
    let doSelect = false;
    
    if (items.TicketNumber == 0) {
      console.log("hit last");
      $ticket_options.last().prop("selected", true);
      doSelect = true;
    } else {
      $ticket_options.each(function () {
        if ($(this).val() == items.TicketNumber) {
          console.log("hit " + items.TicketNumber);
          $(this).prop("selected", true);
          doSelect = true;
          return false;
        }
      });
    }
    // if ticket number can't find
    if (doSelect == false) {
      $ticket_options.last().prop("selected", true);
      console.log("hit failed");
    }
  });
}

$("#TicketForm_verifyCode").focus();
