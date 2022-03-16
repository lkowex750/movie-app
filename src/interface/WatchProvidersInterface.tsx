export interface Result {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
}

export interface WatchProviders {
    results: Result[];
}