export interface SearchResult {
    title: string;
    wordOccurences: {
        mot: string;
        occurrences: number;
    }[];
    imgUrl: string;
    author: string;
}
