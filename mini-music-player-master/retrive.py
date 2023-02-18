import requests
import json
import webbrowser

url = "https://api.estuary.tech/content/list"
payload={}
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer EST1db87ffa-36c7-48b2-bae0-38592a045c01ARY'
}

response = requests.request("GET", url, headers=headers, data=payload)
json_data = json.loads(response.text)  # Extract the response content and convert to a string
for song in json_data:
    if song['name'] == 'kakaka':
        cid = song['cid']
        break
##cid = json_data[0]["cid"]
urls = "https://gateway.estuary.tech/gw/ipfs/" + cid 
webbrowser.open(urls)

##print(response.text)


