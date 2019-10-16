const config = require('../../config.json');
const api_url = config.api_url;
const token_endpoint = config.token_obtain_url;
const auth_header_prefix = config.auth_header_prefix;
export const register_endpoint = config.register_url;

export async function login(username, password) {
    const formData = new FormData();
    formData.set('username', username);
    formData.append('password', password);
    try {
        const response = await fetch(api_url.concat(token_endpoint), { method: 'POST', body: formData });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("username", JSON.parse(Base64.decode(data.access.split('.')[1])).username);
            return { "message": "success" };
        } else if (response.status >= 400) {
            return { "message": "client_error" };
        } else if (response.status >= 500 && response.status) {
            return { "message": "internal_server_error" };
        }
    } catch (e)  {
        return {"message": "api_error"};
    }

}

export async function postDataToEndpoint(relative_url, auth_required, post_data) {
    const _data = JSON.stringify(post_data);
    if (auth_required) {
        return fetch(api_url.concat(relative_url), {
            method: 'POST',
            body: _data,
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth_header_prefix.concat(localStorage.getItem('access'))
            })
        }
        );
    } else {
        return fetch(api_url.concat(relative_url), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: _data
        }
        );
    }
}