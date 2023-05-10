import { LOGIN, PASS } from '$env/static/private'

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {

    // request token
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

    // get brand info by id
    const getBrand = await fetch('https://api.walletapp.co/brands/' + params.id, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + key
        }
    })
    const brand = await getBrand.json()

    // remove token
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