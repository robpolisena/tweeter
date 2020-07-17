// calculates character count from user input
$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    let num = 140;
    let count = $(this).val().length;
    let keysLeft = num - count;
    const $parent = $(this).closest('form');
    const $keyleft = $parent.find('.counter');
    $keyleft.text(keysLeft);
    if (keysLeft < 0) {
      $keyleft.addClass('error');
    } else {
      $keyleft.removeClass('error');
    }
  });
});
