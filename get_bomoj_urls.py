import requests

OMDB_API_KEY = "YOUR_OMDB_API_KEY"  # Replace with your key

def get_imdb_id(title):
    url = "http://www.omdbapi.com/"
    params = {
        "t": title,
        "apikey": "http://www.omdbapi.com/?i=tt3896198&apikey=5407aabb"
    }
    response = requests.get(url, params=params)
    data = response.json()
    print(f"Searching for: {title}")
    print(data)  # <-- Add this line
    if data.get("Response") == "True":
        return data.get("imdbID")
    else:
        print(f"IMDb not found for: {title}")
        return None

def build_bomoj_url(imdb_id):
    return f"https://www.boxofficemojo.com/title/{imdb_id}/"

def map_movies_to_bomoj(movies):
    movie_url_map = {}
    for movie in movies:
        imdb_id = get_imdb_id(movie)
        if imdb_id:
            movie_url_map[movie] = build_bomoj_url(imdb_id)
        else:
            movie_url_map[movie] = None
    return movie_url_map

if __name__ == "__main__":
    # Example: one player’s movies
    movies = [
        "Mission: Impossible - Dead Reckoning Part One",
        "The Naked Gun",
        "Elio"
    ]
    urls = map_movies_to_bomoj(movies)
    for movie, url in urls.items():
        print(f"{movie}: {url}")
