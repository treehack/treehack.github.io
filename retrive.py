import requests
import json
import webbrowser

url = "https://api.estuary.tech/content/list"
payload={}
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer EST6a7f86f7-4646-4503-bdfb-210173b30071ARY'
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


