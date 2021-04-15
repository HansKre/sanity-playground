import React from 'react';
import sanityClient from '../sanity-client';
import './Movies.css';

export default function Movies() {
    const [movies, setMovies] = React.useState(null);

    React.useEffect(() => {
        sanityClient
            .fetch(`*[_type == "movie"]{
                title,
                slug,
                overview,
                poster{
                    asset->{
                        _id,
                        url
                    }
                }
            }`)
            .then((data) => {
                console.log(data);
                setMovies(data)
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <h1>Movies</h1>
            <h2>Movies provided by Sanity.io</h2>
            {movies && movies.map(movie => (
                <div key={movie.slug.current}>
                    <h3>{movie.title}</h3>
                    <img className='thumbnail' src={movie.poster.asset.url} alt={movie.title} />
                    <p>{movie.overview[0].children[0].text}</p>
                </div>
            ))}
        </>
    )
}