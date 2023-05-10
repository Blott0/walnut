import { LOGIN, PASS } from '$env/static/private'

export async function load({ fetch, params }) {

    const requestToken = await fetch('https://api.walletapp.co/oauth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            'email': LOGIN, 
            'password': PASS,
            'permissions': [ 'brands.get' ]
        })
    })

    const token = await requestToken.json()
    let key

    if (token.error) {
        return token
    }
    else {
        key = token.data.key
    }

    const getBrand = await fetch('https://api.walletapp.co/brands/' + params.id, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + key
        }
    })
    const brand = await getBrand.json()

    const deleteToken = await fetch('https://api.walletapp.co/oauth/token', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + key,
        }
    })
    const res = await deleteToken.json()
    if (!res.success) {
        return res
    }

    return brand
    
}