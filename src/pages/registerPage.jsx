import { Page, Color, TextView, TextInput, CheckBox, ProgressBar } from 'tabris';
import { color_info, color_action, font_info, color_success } from '../config/config';
import { getActionButton } from '../modules/widgets';
import { postDataToEndpoint, register_endpoint } from '../modules/api';
import { emailIsValid, getNameIsMinimalLength } from '../modules/helpers';

export function registerPage() {

    const page = new Page({ title: 'Join In', background: Color.white, autoDispose: true });

    const wasAdded = [];

    const progress = new ProgressBar({
        left: 16, right: 16, maximum: 100
    }).appendTo(page);

    const username = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Username'
    }).onInput(({ text }) => updateProgress(username)).appendTo(page);

    const email = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Email'
    }).onInput(({ text }) => updateProgress(email)).appendTo(page);

    const password = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Password',
        type: 'password'
    }).onInput(({ text }) => updateProgress(password)).appendTo(page);

    const confirm_password = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Confirm Password',
        type: 'password'
    }).onInput(({ text }) => updateProgress(confirm_password)).appendTo(page);

    new CheckBox({
        left: 16, right: 16, top: 'prev() 8',
        text: 'Show password'
    }).onCheckedChanged(event => password.revealPassword = event.value)
        .appendTo(page);

    const accept_terms = new CheckBox({
        left: 16, right: 16, top: 'prev() 8',
        text: 'I accept the Terms and Conditions'
    }).onCheckedChanged(event => {
        if (event.value) {
            infoText.animate({ opacity: 0 });
            progress.selection += 20;
            accept_terms.textColor = color_success;
        } else {
            progress.selection -= 20;
            accept_terms.textColor = Color.black;
        }
        changeColor();
    }).appendTo(page);

    const registerButton = getActionButton('Register').onSelect(register).appendTo(page);

    const infoText = new TextView({
        left: 16, right: 16, top: 'prev() 8',
        alignment: 'centerX',
        text: '',
        textColor: color_info,
        font: font_info,
        opacity: 0
    }).appendTo(page);

    function register() {
        if (username.text === "" || email.text === "" || password.text === "" || confirm_password.text === "") {
            addErrorInfo('Please fill out all required fields \n \n', 'missing_field');
        } else {
            removeErrorInfo("missing_field");
        }
        if (!accept_terms.checked) {
            addErrorInfo('Please accept the Terms \n \n', 'terms_unchecked');
        } else {
            removeErrorInfo("terms_unchecked");
        }
        if (!(password.text === confirm_password.text)) {
            addErrorInfo('Passwords do not match \n \n', 'passwords_not_matching');
        } else {
            removeErrorInfo("passwords_not_matching");
        }
        if (!emailIsValid(email.text) && email.text !== "") {
            addErrorInfo('Email is invalid \n \n', 'email_invalid');
        } else {
            removeErrorInfo("email_invalid");
        }
        if (!getNameIsMinimalLength(username.text) && username.text !== "") {
            addErrorInfo('Minimum Username length is six \n \n', 'username_min_length')
        }

        if (errors.length === 0) {
            postDataToEndpoint(register_endpoint, false, {
                username: username.text,
                password: password.text,
                email: email.text,
                device_model: device.model,
                os_version : device.version
            }).then(response => {
                response.json().then(json => {
                    if (!response.ok) {
                        new tabris.AlertDialog({
                            title: json.message,
                            buttons: { ok: 'Understood' }
                        }).open();
                    } else {
                        new tabris.AlertDialog({
                            title: json.message.concat('\nYou may login now'),
                            buttons: { ok: 'Thanks' }
                        }).onCloseOk(() => { page.dispose(); }).open();
                    }
                });
            });
        }
    }

    const errors = [];

    function addErrorInfo(error, error_code) {
        registerButton.animate({
            opacity: 0.5,
            transform: {
                scaleX: 1.1,
                scaleY: 1.1,
                rotation: -.05
            }
        },
            {
                duration: 100,
                repeat: 3,
                reverse: true,
                easing: 'ease-out'
            });
        if (!infoText.text.includes(error)) {
            infoText.text += error;
            errors.push(error_code);
            infoText.animate({ opacity: 1 });

        }
    }

    function removeErrorInfo(errorcode) {
        infoText.text += '';
        errors.pop(errorcode);
    }

    function updateProgress(origin) {
        if (!wasAdded.includes(origin)) {
            infoText.animate({ opacity: 0 });
            wasAdded.push(origin);
            progress.selection += 20;
        }
        if (origin.text === "") {
            wasAdded.pop(origin);
            progress.selection -= 20;
        }
        changeColor();
    }

    function changeColor() {
        if (progress.selection >= progress.maximum) {
            progress.tintColor = color_success;
        } else {
            progress.tintColor = color_action;
        }
    }

    return page;
}
