(function ($) {
    'use strict';

    var form = $('.contact__form'),
        message = $('.contact__msg'),
        form_data;

    // Success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-danger');
        message.text(data);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    
    form.submit(function (e) {
        console.log("oyanaaaaaaa")
        let form_data = $(this).serializeArray();

        // Access each value by name
        let data = {};
        form_data.forEach(field => {
            data[field.name] = field.value;
        });
    
    
        // Example of accessing specific values
        let name = data.name;
        let email = data.email;
        let phone = data.phone;
        let subject = data.subject;
        let message = data.message;
        const payload = {
            name: name,
            subject: subject,
            message: message,
            email: email,
            phone: phone
        };
        e.preventDefault();
        
        fetch('https://apps.oswallet.app/oyasyncwalletapi/api/WebsiteRequest/SaveEnquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                done_func('Your message has been sent successfully.')
            })
            .catch((error) => {
                fail_func('There was an error sending your message. Please try again later.')
            });


    });
    
})(jQuery);