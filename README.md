# novaposhta-api
Use of NovaPoshta's api (delivery company) in a online shop.

First of all, I built this site from scratch. Every single line of code was written by me. 
It has a lot more functionality than I planned at the beginning... I just couldn't stop)))

This project contains an example of online shop and use of a delivery company's API. (in this case I'm using the most popular and most effective delivery company in Ukraine "NovaPoshta")
The main goal is that the buyer can choose a delivery adress, recive estimated delivery date and shipping cost while ordering from online shop.
Shipping cost, estimated delivery date will be imported/calculated by delivery company API's and response will be shown to the buyer.

If you put some article to cart and press order button, JavaScript will autamaticaly calculate all necessary data for API request. Then you have to input some city and press next - it will generate 4 different requests: 1.Request CityList to take from it city Ref number, 2.Request exchange rate (prices are in USD, shipping cost calculated in UAH), 3. Request estimated delivery date, 4. request shipping cost.

