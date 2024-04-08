export interface ShowImage {
    medium: string;
    original: string;
}

export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string;
    schedule: {
        time: string;
        days: string[];
    };
    rating: {
        average: number;
    };
    weight: number;
    network: {
        id: number;
        name: string;
        country: {
            name: string;
            code: string;
            timezone: string;
        };
        officialSite: null | string;
    };
    webChannel: null;
    dvdCountry: null;
    externals: {
        tvrage: null | number;
        thetvdb: null | number;
        imdb: string;
    };
    image: ShowImage;
    summary: string;
    updated: number;
    _links: {
        self: {
            href: string;
        };
        previousepisode: {
            href: string;
            name?: string;
        };
    };
}

export interface Episode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    airdate: string;
    airtime: string;
    runtime: number;
    image: {
        medium: string;
        original: string;
    };
    summary: string;
}
