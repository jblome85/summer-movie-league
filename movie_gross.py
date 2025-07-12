import requests
from bs4 import BeautifulSoup

def get_imdb_box_office(imdb_id):
    url = f"https://www.imdb.com/title/{imdb_id}/boxoffice"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to load: {url}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.select("div.article li")

    for row in rows:
        if "Gross US & Canada" in row.text:
            amount = row.text.split(":")[-1].strip().replace("$", "").replace(",", "")
            if amount.isdigit():
                return int(amount)
            else:
                print(f"Found text but not numeric: {amount}")
                return 0

    print("No Gross US & Canada found")
    return 0

# 🔍 Example usage
if __name__ == "__main__":
    imdb_ids = {
        "Mission: Impossible – Dead Reckoning Part One": "tt9603208",
        "Barbie": "tt1517268",
        "Oppenheimer": "tt15398776"
    }

    for title, imdb_id in imdb_ids.items():
        gross = get_imdb_box_office(imdb_id)
        print(f"{title}: ${gross:,}" if gross else f"{title}: No data")
