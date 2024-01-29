export interface SlideItem {
    id: number;
    title: string;
    genre: string;
    poster_path: string;
}

interface ContentMap {
    films: SlideItem[];
    series: SlideItem[];
}

export interface Slides {
    [genre: string]: SlideItem[];
}

export const selectionFilter = (contentMap: ContentMap, searchTerm: string = ''): Slides => {
    const slides: Slides = {};

    const addContentToSlides = (contentList: SlideItem[]) => {
        contentList.forEach(slideItem => {
            if (searchTerm === '' || slideItem.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                if (slides[slideItem.genre]) {
                    slides[slideItem.genre].push(slideItem);
                } else {
                    slides[slideItem.genre] = [slideItem];
                }
            }
        });
    };

    addContentToSlides(contentMap.films);
    addContentToSlides(contentMap.series);

    return slides;
};

export default selectionFilter;
