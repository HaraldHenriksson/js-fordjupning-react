import axios from 'axios'
import { AbyssinianCat, Cat, ImageSearchResponse } from '../types/RandomCatResponse'

const FAKE_DELAY = 1500

// Create a new axios instance
const instance = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async<T>(endpoint: string) => {
    const response = await instance.get<T>(endpoint)

    // fake slow API if FAKE_DELAY is not falsy
    !!FAKE_DELAY && await new Promise(resolve => setTimeout(resolve, FAKE_DELAY))

    return response.data
}

/**
 * Get a random cat
 *
 * @returns Promise
 */

export const getRandomCat = async () => {
    const data = await get<ImageSearchResponse>("images/search?limit=10")

    return data[0]
}

export const getRandomAbysCat = async () => {
    const data = await get<AbyssinianCat>("images/search?breeds_ids=abys")

    return data[0]
}

export const getBreedCat = async (breedId: string) => {
    const data = await get<Cat[]>(`images/search?breed_ids=${breedId}`);

    return data[0]
}