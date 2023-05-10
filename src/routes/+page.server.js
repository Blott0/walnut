import { LOGIN, PASS } from '$env/static/private'

export async function load({ fetch }) {

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

    const getBrands = await fetch('https://api.walletapp.co/brands', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + key
        }
    })
    const brands = await getBrands.json()

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

    return brands
    
}

/** @type {import('./$types').Actions} */
export const actions = {
    add: async ({ request }) => {

        // request a token
        const requestToken = await fetch('https://api.walletapp.co/oauth/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                'email': LOGIN, 
                'password': PASS,
                'permissions': [ 'brands.store' ]
            })
        })

        const token = await requestToken.json()

        if (token.error) {
            return token
        }
        const key = token.data.key

        // add a new brand

        // get formdata
        const form = await request.formData()
        const newBrand = {
            organization_id: 'CnoYY70MHDgMUMm4G9gwwRPNHv',
            name: form.get('name'),
            primary_color: form.get('color1'),
            second_color: form.get('color2'),
            third_color: form.get('color3'),
            logo: form.get('logo')
        }

        // add the brand

        const requestAdd = await fetch('https://api.walletapp.co/brands', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + key
            },
            body: JSON.stringify(newBrand)
        })
        const added = await requestAdd.json()
        let error
        if (added.errors) {
            error = added.errors
        }

        // delete the token

        const deleteToken = await fetch('https://api.walletapp.co/oauth/token', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + key,
            }
        })
        const deleted = await deleteToken.json()
        if (!deleted.success) {
            return deleted
        }

        if (error) {
            return error
        }

        return { success: true }

    }
}