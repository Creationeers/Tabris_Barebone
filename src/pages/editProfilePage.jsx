import { Page, Color, TextInput, TextView } from 'tabris';
import { getActionButton, getInfoText } from '../modules/widgets';
import { color_heading, font_large } from '../config/config';

export function editProfilePage() {
    const page = new Page({ title: 'Edit Profile', background: Color.white, autoDispose: false });

    const username = new TextView({
        left: 16, right: 16, top: 0,
        alignment: 'centerX',
        text: localStorage.getItem("username"),
        textColor: color_heading,
        font: font_large
    });

    const password = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Password'
    }).onInput(() => { infoText.animate({ opacity: 0 }); });

    const password_confirm = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Confirm Password'
    }).onInput(() => { infoText.animate({ opacity: 0 }); });

    const email = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Email'
    });

    const saveButton = getActionButton('Save').onSelect(() => { send(); });

    const infoText = getInfoText('Passwords do not match');

    page.append(username);
    page.append(password);
    page.append(password_confirm);
    page.append(email);
    page.append(saveButton);
    page.append(infoText);
    return page;

    async function send() {
        if ((password.text !== password_confirm.text) && (password.text !== "" || password_confirm.text !== "")) {
            infoText.animate({ opacity: 1 });
        } else {
            const formData = new FormData();
            formData.set('username', username.text);
            formData.append('password', password.text);
        }
    }

}
