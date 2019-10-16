import { TextInput, TextView, Color, CheckBox, Page } from 'tabris';
import { mainPage } from './mainPage';
import { registerPage } from './registerPage';
import { color_success } from '../config/config';
import { getActionButton, getHeadingText, getInfoText } from '../modules/widgets';
import { getTimeOfDay } from '../modules/helpers';
import { login } from '../modules/api';

const Base64 = require('js-base64').Base64;

export function loginPage(navigationView) {
    const page = new Page({
        title: '',
        background: Color.white
    });

    const welcomeText = getHeadingText('Good '.concat(
        getTimeOfDay(new Date().getHours()))
    ).appendTo(page).animate({
        opacity: 0.9,
        transform: {
            scaleX: 1.1,
            scaleY: 1.1
        }
    }, {
            delay: 0,
            duration: 2000,
            repeat: Infinity,
            reverse: true,
            easing: 'ease-out'
        });

    const username = new TextInput({
        left: 16, right: 16, top: 'prev() 40',
        message: 'Username'
    }).onInput(({ text }) => { infoText.animate({ opacity: 0 }); }).appendTo(page);

    const password = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Password',
        type: 'password'
    }).onInput(({ text }) => { infoText.animate({ opacity: 0 }); }).appendTo(page);

    new CheckBox({
        left: 16, right: 16, top: 'prev() 8',
        text: 'Show password'
    }).onCheckedChanged(event => password.revealPassword = event.value)
        .appendTo(page);

    const loginButton = getActionButton('Login').onSelect(_login).appendTo(page);

    const registerButton = getActionButton('Register').onSelect(() => { register(navigationView); }).appendTo(page);

    const infoText = getInfoText('Please enter Pasword and Username').appendTo(page);

    const copyrightText = new TextView({
        bottom: true, height: 'auto',
        left: 16, right: 16, bottom: 8, alignment: 'centerX',
        text: 'Created by Enzo Hilzinger',
        font: "normal thin 12px sans-serif"
    }).appendTo(page);

    async function _login() {
        if (username.text === "" || password.text === "") {
            infoText.animate({ opacity: 1 });
        } else {
            loginButton.animate({
                transform: {
                    scaleX: .95,
                    scaleY: .95
                }
            }, {
                    duration: 500,
                    repeat: 3,
                    reverse: true,
                    easing: 'ease-out'
                }
            );
            const logon_result = await login(username.text, password.text);
            if (logon_result.message === "success") {
                loginButton.background = color_success;
                openMainPage(localStorage.getItem("username"), navigationView);
            } else if (logon_result.message === "client_error") {
                infoText.text = "Wrong Password or Username";
                infoText.animate({ opacity: 1 });
            } else if (logon_result.message === "internal_server_error" || logon_result.message === "api_error") {
                infoText.text = "Somethin went wrong \n Please try again later";
                infoText.animate({ opacity: 1 });
            }
        }
    }

    function openMainPage(_username, _navigationView) {
        mainPage(_username, _navigationView).appendTo(_navigationView);
        page.dispose();
    }

    function register(_navigationView) {
        registerPage().appendTo(_navigationView);
    }

    return page;
}
