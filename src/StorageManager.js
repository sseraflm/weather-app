export class StorageManager {
    constructor() {
        this.historyKey = "History"
        this.quickSearchKey = "quickSearch"
    }

    // fetchWeatherData
    saveHistory(searches) {
        const JSONDataHistory = JSON.stringify(searches);
        localStorage.setItem(this.historyKey, JSONDataHistory);
    }

    loadHistory() {
        const JSONDataHistory = localStorage.getItem(this.historyKey)
        if (JSONDataHistory === null) {
            return [];
        }
        const searches = JSON.parse(JSONDataHistory)
        return searches
    }

    // addToQuickSearch
    saveQuickSearch(cities) {
        const JSONQuickSearch = JSON.stringify(cities);
        localStorage.setItem(this.quickSearchKey, JSONQuickSearch);
    }

    loadQuickSearch() {
        const JSONQuickSearch = localStorage.getItem(this.quickSearchKey)
        if (JSONQuickSearch === null) {
            return [];
        }
        const searches = JSON.parse(JSONQuickSearch)
        return searches
        
    }
    
}