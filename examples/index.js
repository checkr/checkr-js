$(function () {
  Checkr.setPublishableKey('YOUR_KEY_HERE');
  $('#candidate-submit').click(function (e) {
    e.preventDefault();

    $('#response').hide();

    var payload = {
      first_name:     $('#firstName').val(),
      middle_name:    $('#middleName').val(),
      no_middle_name: $('#noMiddleName').prop('checked'),
      last_name:      $('#lastName').val(),
      ssn:            $('#ssn').val(),
      email:          $('#email').val(),
      phone:          $('#phone').val(),
      dob:            $('#dob').val(),
      zipcode:        $('#zipcode').val()
    };

    // create candidate
    Checkr.candidate.create(payload, function (status, response) {
      text = 'status:\n' + status + '\n\nresponse:\n' + JSON.stringify(response, false, 4)
      $('#response pre').html(text);
      $('#response').show();
    });
  });

  $('#candidate-populate').click(function () {
    $(this).attr('disabled', true);

    var fields = ['firstName', 'middleName', 'lastName', 'ssn', 'email', 'phone', 'dob', 'zipcode'];
    for (var i in fields) {
      var field = $('#' + fields[i]);
      field.val(field.attr('placeholder'));
    }
  });
});
