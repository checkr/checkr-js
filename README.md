Checkr.js
=========

Checkr.js makes it easy to collect sensitive personal data without having the information touch your server.

#### Including Checkr.js
```html
<script type="text/javascript" src="https://js.checkr.io/checkr-1.0.min.js"></script>
```

#### Setting your publishable key
You have to set your publishable key so that Checkr can identify your website.
You can retrieve your publishable key for test and production in your dashboard.
```javascript
Checkr.setPublishableKey('YOUR_KEY_HERE');
```

#### Creating a candidate

``` javascript
var candidateData = {
  first_name: 'John',
  middle_name: 'Peter',
  last_name: 'Smith',
  ssn: '111-11-1111',
  email: 'john@smith.org',
  phone: '(310) 111-1111',
  dob: '10/02/1987'
};
```

```javascript
Checkr.candidate.create(candidateData, function (status, response) {
  console.log("status: " + status);

  if (response.error) {
    var errorMessage = response.error;
    console.log(errorMessage);
    
    // your logic
  } else {
    var candidate_id = response.candidate_id;
    
    // your logic
  }
});
```

#### Client-side validation helpers
##### Checkr.candidate.isSSNValid
Checks whether or not an SSN is valid
```javascript
Checkr.candidate.isSSNValid("111-11-1111") // true
Checkr.candidate.isSSNValid("111-1111-1111") // false
``` 
##### Checkr.candidate.isEmailValid
Checks whether or not an email is valid
```javascript
Checkr.candidate.isEmailValid("john@smith.org") // true
Checkr.candidate.isEmailValid("john.com") // false
``` 

##### Checkr.candidate.isPhoneValid
Checks whether or not a phone number is valid
```javascript
Checkr.candidate.isPhoneValid("3101111111") // true
Checkr.candidate.isPhoneValid("31011111") // false
``` 
