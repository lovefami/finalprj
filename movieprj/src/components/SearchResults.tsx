// // src/components/SearchResults.tsx

// import React from 'react';
// import { SlideItem } from '../utils/selection-filters';

// interface SearchResultsProps {
//     results: SlideItem[];
//     searchSelection: (movie: SlideItem) => void; 
// }

// const SearchResults: React.FC<SearchResultsProps> = ({ results, searchSelection }) => {
//     return (
//         <div>
//             {results.map((movie: SlideItem)=>(
//                 <div key={movie.movieId} onClick = {()=> searchSelection(movie)}>
//                     <h3>{movie.title}</h3>
//                     <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
//                          alt="{movie.title}"
//                          style={{ width: '100px', height: '150px' }}
//                     />
//                 </div>
//             ))
//             }
//         </div>
//     );
// };

// export default SearchResults;
