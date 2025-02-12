export async function getMovies(algorithm) {
    let result = {};

    const hash = (window.location.hash.slice(1) ?? '/').replace('/', '')

    const type = {
        '': 'movie',
        'movies': 'movie',
        'series': 'tv'
    }[hash]

    const currentAlgorithm = {
        'popular': 'popular',
        'top rated': 'top_rated'
    }[algorithm] ?? 'popular'

    await fetch(
        `https://api.themoviedb.org/3/${ type }/${ currentAlgorithm }?api_key=348088421ad3fb3a9d6e56bb6a9a8f80&language=en-US&page=1`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}

export async function search(keyword) {
    let result = {};

    await fetch(
        `https://api.themoviedb.org/3/search/keyword?query=${ keyword }&page=1&api_key=348088421ad3fb3a9d6e56bb6a9a8f80`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}

export async function getMovieByTypeAndAlgorithm(type, algorithm = 'popular') {
    let result = {};

    const formattedType = {
        '': 'movie',
        'movies': 'movie',
        'tv-shows': 'tv',
    }[type.toLowerCase()]

    const algo = {
        'popular': 'popular',
        'Popular': 'popular',
        'top rated': 'top_rated',
        'Top Rated': 'top_rated',
        'Airing Today': 'airing_today',
        'On TV': 'on_the_air',
        'Now playing': 'now_playing',
        'Upcoming': 'upcoming'
    }[decodeURI(algorithm)]

    await fetch(
        `https://api.themoviedb.org/3/${ formattedType }/${ algo }?api_key=348088421ad3fb3a9d6e56bb6a9a8f80&language=en-US&page=1&with_genres=27`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}

export async function getMovieById(id) {
    let result = {};

    await fetch(`https://api.themoviedb.org/3/movie/${ id }?api_key=348088421ad3fb3a9d6e56bb6a9a8f80&language=en-US`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}