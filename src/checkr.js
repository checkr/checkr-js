var Checkr = {
  rootUrl: 'https://api.checkr.com',
  timeout: 30000,
  publishableKey: null,
  setPublishableKey: function(key) {
    this.publishableKey = key;
  },

  post: function(path, data, callback) {
    var xhr = new XMLHttpRequest();
    var url = Checkr.rootUrl + path;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Checkr.publishableKey));
    xhr.onreadystatechange = function () {
      try {
        var jsonResponse = JSON.parse(xhr.responseText);
      } catch (e) {
        var jsonResponse = { text: xhr.responseText };
      }

      callback(xhr.status, jsonResponse);
    };
    var dataJSONString = JSON.stringify(data);
    xhr.send(dataJSONString);
  },

  isValidPublishableKey: function() {
    if (!this.publishableKey || typeof this.publishableKey != 'string') return false;
    if (/\s/g.test(this.publishableKey)) return false;
    return true;
  },

  candidate: {
    isSSNValid: function(ssn) {
      if (!ssn) return false;
      return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
    },

    isFirstNameValid: function(firstName) {
      if (!firstName) return false;
      return (/\w{2,}/.test(firstName));
    },

    isLastNameValid: function(lastName) {
      if (!lastName) return false;
      return (/\w{2,}/.test(lastName));
    },

    isPhoneValid: function(phone) {
      if (!phone) return false;
      return phone.match(/\d/g).length === 10;
    },

    isEmailValid: function(email) {
      if (!email) return false;
      return (/^[^@<\s>]+@[^@<\s>]+$/.test(email));
    },

    isMiddleNameEmpty: function(middleName) {
      return !middleName || !(/\w{1,}/.test(middleName));
    },

    isMiddleNameValid: function(middleName, noMiddleName) {
      if (noMiddleName) {
        return this.isMiddleNameEmpty(middleName) === true;
      } else {
        return this.isMiddleNameEmpty(middleName) === false;
      }
    },

    validate: function (candidateData) {
      var requiredKeys = ['first_name', 'last_name', 'dob', 'ssn', 'email', 'phone'];
      var errors = [];

      for (var i = 0; i < requiredKeys.length; i++) {
        var key = requiredKeys[i];
        if (!candidateData || !(key in candidateData) || !candidateData[key]) {
          errors.push(key + ' is missing');
        }
      }

      if (!this.isSSNValid(candidateData.ssn)) {
        errors.push('invalid ssn');
      }
      if (!this.isFirstNameValid(candidateData.first_name)) {
        errors.push('invalid first name');
      }
      if (!this.isLastNameValid(candidateData.last_name)) {
        errors.push('invalid last name');
      }
      if (!this.isPhoneValid(candidateData.phone)) {
        errors.push('invalid phone');
      }
      if (!this.isEmailValid(candidateData.email)) {
        errors.push('invalid email');
      }
      if (!this.isMiddleNameValid(candidateData.middle_name, candidateData.no_middle_name)) {
        errors.push('invalid middle name');
      }

      return errors;
    },

    create: function (data, callback) {
      if (!data) {
        var message = 'No data supplied';

        if (!callback) {
          throw message;
        } else {
          callback(400, {
            error: message
          });
        }
        return;
      }
      var errors = this.validate(data);

      if (errors.length > 0) {
        callback(400, { error: errors.join(', ') });
      } else {
        Checkr.post('/js/candidates', data, callback);
      }
    }
  },
};
