class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.url = new URL(this.baseUrl);
    }

    addQuery(key, value) {
        this.url.searchParams.append(key, value);
    }

    async fetchData() {
      return await fetch(this.url)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export default Api;