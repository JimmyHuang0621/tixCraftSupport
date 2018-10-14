let scripts = document.getElementsByTagName('script');
for (let i = 0; i < scripts.length; i++) {
  if (scripts[i].innerHTML.includes('TicketForm')) {
    console.log('find TicketForm： ' + i)
    let data = scripts[i].innerHTML,
        agree_re = /TicketForm\[agree]\[(.{44})]/,
        agree = agree_re.exec(data)[0],
        ticketPrice_re = /TicketForm\[ticketPrice]\[(.{44})]/,
        ticketPrice = ticketPrice_re.exec(data)[0]

    $("#TicketForm_agree").prop('checked', true).prop('name', agree);
    $("#TicketForm_checked").prop('name', ticketPrice);
    break;
  }
}

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
