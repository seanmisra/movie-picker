export class Recommendation {
    hasData: boolean = false
    movieName: string;
    movieYear: number;
    score?: number; // relevance score, not passed back from recommendation API yet
    imgLink?: string;
    actors?: string;
    boxOffice?: string;
    director?: string;
    genre?: string;
    language?: string;
    plot?: string;
    rated?: string;
    ratings?: any[];
    released?: string;
    runtime?: string;
}