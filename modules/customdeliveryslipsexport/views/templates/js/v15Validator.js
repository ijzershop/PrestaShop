$(document).ready(function() {
    $('#v15_offerte').bootstrapValidator({
        message: 'Waarde niet correct',
        live: 'enabled',
        trigger: 'blur',  
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'Naam niet herkend',
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z ]+$/,
                        message: 'Uw invoer bevat incorrecte tekens (cijfers, leestekens).'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    },
                    emailAddress: {
                        message: 'U heeft geen geldig emailadres ingevoerd'
                    }
                }
            },
            street: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    }
                }
            },
            streetnumber: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    }
                }
            },
            postalCode: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    },
                    zipCode: {
					    country: 'NL',
					    message: 'Postcode niet herkend'
					}
                }
            },
            place: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    }
                }
            },
            subject: {
                validators: {
                    notEmpty: {
                        message: 'Dit veld is verplicht'
                    }
                }
            }
        }
    });
});
